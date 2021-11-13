<template>
  <div id="home" v-if="banners">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- :class="{fixed:isTabFixed}" -->
    <tab-control id="tab-control" :titles="titles" @TabClick="getIndex"  ref="tabControl1" v-show="isTabFixed"></tab-control>
    <better-scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @contentScroll="contentScroll"
      :pullUpLoad="true"
      @getMoreData="getMoreData"
    >
      <home-swiper :banners="banners" @imageLoad="imageLoad"/>
      <recommeng-view :recommend="recommend" />
      <feature-view />
      <tab-control :titles="titles" @TabClick="getIndex" ref="tabControl2"></tab-control>
      <!-- 由于 fixed 在 better-scroll 中脱标 导致问题 不能这样使用 具体原因其实跟 这个插件的源码设计有关 translateY 这里通过其他视觉效果来解决-->
      <!-- <tab-control :titles="titles" @TabClick="getIndex" :class="{fixed:isTabFixed}" ref="tabControl"></tab-control> -->
      <goods-list :goods="goods[currentType].list" />
    </better-scroll>
    <back-top @click.native="backTop" v-show="isUpTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommengView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import RecommengView from "./childComps/RecommengView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BetterScroll from "components/common/bscroll/BetterScroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/util.js"

export default {
  name:'Home',
  data() {
    return {
      banners: [],
      recommend: [],
      titles: ["流行", "精选", "新款"],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      // 是否展示
      isUpTop: false,
      isTabFixed:false,
      tabOffsetTop:0,
      saveY:0
    };
  },
  components: {
    HomeSwiper,
    RecommendView,
    RecommengView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    BetterScroll,
    BackTop,
  },
  destroyed(){
    // console.log('home have destory');
  },
  // 设置 keep-alive 时，activated deactivated 才有作用
  activated() {
    // console.log('actived');
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // this.$refs.scroll && this.$refs.scroll.scrollTo(this.saveY, 0);
  },
  deactivated(){
    // console.log('disactived');
    // console.log('scrollY' + this.$refs.scroll.scrollY());
    this.saveY = this.$refs.scroll.scrollY();
    // console.log('savaY' + this.saveY);
  },
  created() {},
  mounted() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求不同信息
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 监听 item 中图片加载完成
    // 防抖函数
    // let debounce = null
    // this.$bus.$on("loadFinish", () => {
    //   clearTimeout(debounce)
    //   debounce = setTimeout(() => {
    //     this.$refs.scroll && this.$refs.scroll.refresh();
    //     console.log('-------------');
    //   },800);
    //   // console.log('--------');
    // });
    // 防抖函数 debounce
    // const refresh = ()=>{
    //   this.$refs.scroll && this.$refs.scroll.refresh();
    //   console.log('-----------');
    // }
    // this.$bus.$on("loadFinish",debounce(refresh,200))
    const refresh = debounce(()=>{
      this.$refs.scroll && this.$refs.scroll.refresh()
    },200)
    this.$bus.$on("loadFinish",()=>{
      refresh()
    })
  },
  methods: {
    /**
     * 事件相关
     */
    getIndex(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          null;
      }
      console.log(index);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      // console.log(this.$refs.scroll);
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 这里是子组件中 scroll 挂载过来的方法
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(option) {
      // console.log(option);
      // 上拉弹框是否展示
      this.isUpTop = (-option.y) > 1000 ? true : false;
      // tab-control
      this.isTabFixed = (-option.y) > this.tabOffsetTop ? true :false;
    },
    // 轮播图图片加载完成
    imageLoad(){
      // console.log('photo loading finish');
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll && this.$refs.scroll.finishPullUp();
        this.$refs.scroll && this.$refs.scroll.refresh();
      });
    },
    getMoreData() {
      console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
#tab-control {
  /* position: sticky; */
  position: relative;
  /* padding: 3px 0; */
  background-color: #fff;
  top: 44px;
}
.fixed {
  position: fixed;
}
</style>