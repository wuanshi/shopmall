<template>
  <div>
    <cart-item
      v-for="(item, index) in cartList"
      :key="index"
      :good-item="item"
    />
  </div>
</template>

<script>
import CartItem from "./CartListItem.vue";

import { mapGetters } from 'vuex'
 
export default {
  components: {
    CartItem,
  },
  computed:{
    ...mapGetters(['cartList'])
  }
};
</script>

<style>
</style>