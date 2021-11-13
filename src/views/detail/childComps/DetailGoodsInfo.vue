<template>
  <div v-if="Object.keys(goodsInfo).length !== 0" >
    <div>{{goodsInfo.desc}}</div>
    <div>{{goodsInfo.detailImage[0].key}}</div>
    <div v-if="goodsInfo.detailImage[0].anchor">
      <img :src="goodsInfo.detailImage[0].anchor" alt="">
    </div>
    <div v-for="(item,index) in goodsInfo.detailImage[0].list" :key="index">
      <img :src="item" alt="" @load="goodsImgLoad">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    goodsInfo:{
      type:Object,
    }
  },
  data(){
    return {
      
    }
  },
  methods:{
    goodsImgLoad(){
      // 图片加载完成
      this.$emit("goodsImgLoad");
    }
  }
}
</script>

<style scoped>
img {
  width: 100vw;
}

</style>