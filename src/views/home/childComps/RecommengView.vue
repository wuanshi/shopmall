<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  padding: 15px 0 20px 0;
  border-bottom: 15px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  height: 70px;
  width: 70px;
  margin-bottom: 5px;
}
</style>