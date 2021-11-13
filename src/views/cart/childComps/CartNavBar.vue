<template>
  <div>
    <nav-bar class="cart-top-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import { mapGetters } from 'vuex'

export default {
  components: { NavBar },
  computed:{
    ...mapGetters(['cartLength'])
  }

}
</script>

<style scoped>
  .cart-top-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>