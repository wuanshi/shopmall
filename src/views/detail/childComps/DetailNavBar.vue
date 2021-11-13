<template>
  <nav-bar>
    <div slot="left" @click="backPre">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="detail-nav-bar">
      <div v-for="(item, index) in navitem" :key="index" class="detail-item" :class="{ active:curIndex === index }" @click="changeIndex(index)">
        {{ item }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      navitem: ["商品", "参数", "评论", "推荐"],
      curIndex:0
    };
  },
  methods:{
    changeIndex(index){
      this.curIndex = index;
      this.$emit("tabControl",index);
    },
    backPre(){
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.detail-nav-bar {
  display: flex;
  font-size: 14px;
}
.detail-item {
  flex: 1;
}
img {
  margin-top: 10px;
}
.active {
  color: red;
}
</style>