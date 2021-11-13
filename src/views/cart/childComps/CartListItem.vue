<template>
  <div class="cart-item">
    <check-button @clickChange="clickChange" :isSelected="goodItem.isSelected"/>
    <div class="goodInfo">
      <div>
        <img :src="goodItem.image" alt="">
      </div>
      <div>
        <div>{{goodItem.desc}}</div>
        <div>{{goodItem.price}} x{{goodItem.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'

export default {
  props:{
    goodItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{
    CheckButton
  },
  methods:{
    clickChange(){
      this.goodItem.isSelected = !this.goodItem.isSelected;
    }
  }

}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
}
.goodInfo {
  display: flex;

  height: 15vh;
}
.goodInfo img {
  height: 15vh;
  width: 20vw;
  border-radius: 5px;
}
</style>