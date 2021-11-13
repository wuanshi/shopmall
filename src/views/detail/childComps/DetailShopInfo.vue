<template>
  <div class="shop-info">
    <div class="top-info">
      <img :src="shopInfo.logo" alt="" />
      <div>{{ shopInfo.name }}</div>
    </div>

    <div class="sell-info">
      <div class="sell-info-left">
        <div>
          <div class="info-font">{{ shopInfo.cSells | sellCountFilter }}</div>
          <div class="info-end">总销售量</div>
        </div>
        <div>
          <div class="info-font">{{ shopInfo.cGoods | sellCountFilter }}</div>
          <div class="info-end">全部宝贝</div>
        </div>
      </div>
      <div class="sell-info-right">
        <div v-for="item in shopInfo.score" :key="item.name">
          {{ item.name }} {{ item.score }} {{ item.isBetter ? "高" : "低" }}
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="shop-enter">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopInfo: {
      type: Object,
    },
  },
  filters: {
    sellCountFilter: function (value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped>
.shop-info {
  padding: 30px 8px;
  border-bottom: 3px solid #f2f5f8;
}
.top-info {
  display: flex;
  align-items: center;
}
.top-info img {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
}
.sell-info {
  display: flex;
}
.info-font {
  font-size: 20px;
  text-align: center;
  padding: 2px 5px;
}
.info-end {
  font-size: 12px;
  text-align: center;
  padding: 2px 5px;
}
.shop-bottom {
  text-align: center;
}
.shop-enter {
  /* text-align: center;
  font-size: 14px;
  padding: 3px 2px;
  border-radius: 2px;
  background-color: #f2f5f8; */
  display: inline-block;
  font-size: 14px;
  background-color: #f2f5f8;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 10px;
}
</style>