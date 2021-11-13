<template>
  <div v-if="userComment.length != 0">
    <div>
      <div>用户评价</div>
      <div>更多</div>
    </div>
    <div v-for="item in userComment" :key="item.uname">
      {{item}}
      <img :src="item.user.avatar" alt="">
      {{ item.user.uname }}
      {{item.content}}
      {{item.created | showDate}}
      {{item.style}}
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/util.js'
export default {
  props: {
    userComment: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
      showDate: function (value) {
        let date = new Date(value * 1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
};
</script>

<style>
</style>