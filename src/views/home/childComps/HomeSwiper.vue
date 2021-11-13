<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";
export default {
  name:'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return {
      isLoad:true
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods:{
    imageLoad(){
      if(this.isLoad){
        this.$emit("imageLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style>
</style>