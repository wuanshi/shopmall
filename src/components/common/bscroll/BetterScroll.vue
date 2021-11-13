<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);

export default {
  data() {
    return {
      scroll: null,
      // 是否开启上拉加载请求数据
      isPullUpLoad: false,
      data: 30,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.initBscroll();
    // 将 scrollTo 方法挂载在 this.scroll 上
    // this.scroll.scrollTo()
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("getMoreData");
      });
    }
  },
  methods: {
    initBscroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        click: true,
        probeType: this.probeType,
        // 是否动态加载数据
        pullUpLoad: this.pullUpLoad,
        eventPassthrough: "horizontal",
      });
      // 将滚动数据发送出去，让父组件能够实时监听做出响应
      this.scroll.on("scroll", (option) => {
        // console.log(option);
        this.$emit("contentScroll", option);
      });
      // this.scroll.on("pullingUp", this.pullingUpHandler);
    },
    async pullingUpHandler() {
      this.isPullUpLoad = true;
      // 请求数据
      // await this.requestData()
      this.$emit("getMoreData");
      // await setTimeout(() => {
      //   console.log("上拉加载更多");
      // }, 3000);
      this.scroll.finishPullUp();
      // 这一步不知道是在做什么
      // BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度
      // 之前不能成功划上来就是因为没能重新计算可滚动的高度
      this.scroll.refresh();
      this.isPullUpLoad = false;
    },
    // 在组将中定义的回到顶部方法，从父组件中调用
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollY(){
      // console.log(this.scroll.y);
      return this.scroll ? this.scroll.y : 0;
    }
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
}
</style>