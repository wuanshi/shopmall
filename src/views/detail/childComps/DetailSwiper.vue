<template>
  <swiper>
    <swiper-item v-for="item in swiperitem" :key="item" class="detail-swiper">
      <img :src="item" alt="" @load="swiperImgLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  name: "DetailSwiper",
  props: {
    swiperitem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: true,
    };
  },
  components: { Swiper, SwiperItem },
  methods: {
    swiperImgLoad() {
      if (this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = false;
      }
    },
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>