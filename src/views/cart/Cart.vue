<template>
  <div id="cart">
    <cart-nav-bar />
    <cart-list />
    <cart-bottom-bar class="bottom-bar"/>
  </div>
</template>

<script>
import CartBottomBar from './childComps/CartBottomBar.vue'
import CartList from './childComps/CartList.vue'
import CartNavBar from './childComps/CartNavBar.vue'

export default {
  components: { CartNavBar, CartList, CartBottomBar,  },

}
</script>

<style scoped>
  .cart {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>