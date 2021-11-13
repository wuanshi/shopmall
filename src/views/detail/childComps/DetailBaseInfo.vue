<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length !== 0">
    <div class="info-msg">{{baseInfo.itemInfo.desc}}</div>
    <div class="info-price">
      <span class="n-price">￥{{baseInfo.itemInfo.lowNowPrice}}~￥{{baseInfo.itemInfo.highNowPrice}}</span>
      <span class="o-price">￥{{baseInfo.itemInfo.lowPrice}}~￥{{baseInfo.itemInfo.highPrice}}</span>
      <span class="discount">{{baseInfo.itemInfo.discountDesc}}</span>
    </div>
    <div class="info-other">
      <div v-for="n in baseInfo.columns.length - 1" :key="n">
        {{baseInfo.columns[n-1]}}
      </div>
      <div>
        {{baseInfo.services[baseInfo.services.length -1].name}}
      </div>
    </div>
    <div class="info-services">
      <div v-for="index in baseInfo.services.length - 1" :key="index">
        <img :src="baseInfo.services[index-1].icon" alt="">
        {{baseInfo.services[index-1].name}}
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  props:{
    baseInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    
  }
}
</script>

<style scoped>
.base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
.info-msg {
  color: #222;
  font-size: 16px;
}
.info-price {
  margin: 20px 0 15px 0;
}
.info-price .n-price {
  font-size: 22px;
  color: red;
}
.info-price .o-price {
  text-decoration-line: line-through;
  font-size: 10px;
  color: grey;
}
.info-price .discount {
  color: #fff;
  background-color: var(--color-high-text);
  border-radius: 8px;
  padding: 3px;
  font-size: 12px;

  position: relative;
    top: -8px;
}
.info-other {
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #f2f5f8;
  padding: 0 5px 5px 5px;
  font-size: 10px;
  margin-bottom: 5px;
}
.info-services {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  color: #333;
  padding: 15px 0;
}
.info-services img {
  height: 15px;
  width: 15px;
}
</style>