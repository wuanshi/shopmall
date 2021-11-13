<template>
  <div class="detail-view">
    <detail-nav-bar class="detail-nav" ref="nav" @tabControl="tabControl" />
    
    <better-scroll
      class="content"
      ref="detailScroll"
      @contentScroll="contentScroll"
      :probeType="3"
    >
    <!-- <div v-for="(item,index) in $store.state.cart" :key="index">
      {{item}}
    </div> -->
      <detail-swiper :swiperitem="topImages" @swiperImgLoad="swiperImgLoad" />
      <detail-base-info :baseInfo="baseInfo" />
      <detail-shop-info :shopInfo="shopInfo" />
      <detail-goods-info :goodsInfo="goodsInfo" @goodsImgLoad="goodsImgLoad"/>
      <detail-params :good-params="goodParams" ref="params" />
      <detail-comment :userComment="userComment" ref="comment" />
      <goods-list :goods="recommend" ref="recommend" />
    </better-scroll>
    <back-top @click.native="backTop" v-show="isBackTop" />
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart"/>
    <!-- <toast :isShow="isShow" :message="message"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import BetterScroll from "components/common/bscroll/BetterScroll.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParams from "./childComps/DetailParams.vue";
import DetailComment from "./childComps/DetailComment.vue";
import DetailBottomBar from './childComps/DetailBottomBar.vue';
// import Toast from './childComps/Toast.vue';

import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getDetail, getRecommend, Goods, Shop } from "network/detail.js";
import { debounce } from "common/util.js"

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      baseInfo: {},
      shopInfo: {},
      goodsInfo: {},
      goodParams: {},
      recommendGoods: [],
      userComment: [],
      recommend: [],
      isBackTop: false,
      getthemeTopYs:null,
      themeTopYs: [],
      curIndex: 0,
      // isShow:false,
      // message:''
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // console.log(this.$route.params.iid);
    getDetail(this.iid).then((res) => {
      // this.topImages = res
      const data = res.result;
      console.log(res);
      this.topImages = data.itemInfo.topImages;
      this.baseInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shopInfo = new Shop(data.shopInfo);
      this.goodsInfo = data.detailInfo;
      this.goodParams = data.itemParams;
      this.recommendGoods = data.shopInfo.categories;
      this.userComment = data.rate.list;
      // console.log(this.baseInfo);
      // console.log(this.topImages);
    });
    getRecommend().then((res) => {
      this.recommend = res.data.list;
      console.log(this.recommend);
    });
    this.getthemeTopYs = debounce(() => {

      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    }, 100);
  },
  updated() {},
  mounted(){
    const refresh = debounce(()=>{
      this.$refs.detailScroll && this.$refs.detailScroll.refresh()
    },200)
    this.$bus.$on("loadFinish",()=>{
      refresh()
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    DetailBaseInfo,
    BetterScroll,
    DetailGoodsInfo,
    DetailParams,
    BackTop,
    DetailComment,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  methods: {
    ...mapActions(['addCart']),
    swiperImgLoad() {
      this.$refs.detailScroll.refresh();
    },
    // 图片加载完成
    goodsImgLoad(){
      this.getthemeTopYs();
      this.$refs.detailScroll.refresh();
    },
    backTop() {
      this.$refs.detailScroll.scrollTo(0, 0);
    },
    // 滚动数据监测
    contentScroll(position) {
      // const positionY = -position.y;
      // this.isBackTop = positionY > 1000 ? true : false;
      // // console.log(position);

      // for (let i = this.themeTopY.length - 1; i >= 0; i--) {
      //   // 3 2 1 0
      //   if (this.currentIndex != i && positionY < this.themeTopY[i]) {
      //     this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.curIndex = this.currentIndex;
      //   }
      // }
      // console.log(this.themeTopY);


      //获取Y值
        const positionY = -position.y
        this.isBackTop = positionY > 1000 ? true : false;
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {

          //优化
          if (this.currentIndex !== i && ((positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]))) {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.curIndex = this.currentIndex
          }
        }

    },
    tabControl(index) {
      // console.log(index);
      this.$refs.detailScroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 加入购物车
    addToCart(){
      // this.addCart();
       const product = {}
        product.image = this.topImages[0];
        product.title = this.goodsInfo.title;
        product.desc = this.goodsInfo.desc;
        product.price = this.baseInfo.itemInfo.lowNowPrice;
        product.iid = this.iid;

      // this.$store.dispatch('addCart',product)
      this.addCart(product).then(res => {
        // this.isShow = true;
        // this.message = res;
        // setTimeout(()=>{
        //   this.isShow = false;
        //   this.message = ''
        // },1500)
        // console.log(res)
        this.$toast.show(res,2000);
        // console.log(this.$toast);
        })
      // this.$store.dispatch('addCart',product).then(res => console.log(res))

    }
  },
};
</script>

<style scoped>
.detail-view {
  position: relative;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  background-color: #fff;
  overflow: hidden;
}
.detail-nav {
  background-color: #fff;
  height: 44px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: calc(100% - 93px);
}

</style>