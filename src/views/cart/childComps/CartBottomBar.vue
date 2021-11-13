<template>
  <div class="cart-bottom">
    <div class="bottom-left">
      <check-button @clickChange="clickChange" :isSelected="isSelectAll"/> <span>全选</span>
    </div>
    <div>合计: ￥{{totalPrice}}</div>
    <div class="calculate" @click="calculateClick">去计算:{{calculate}}</div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'

import { mapGetters } from 'vuex'

export default {
  components: { CheckButton },
  data(){
    return {
      // isSelected:false
    }
  },
  computed:{
    ...mapGetters(['cartList','cartLength']),
    // 合计总价格
    totalPrice(){
      return this.cartList.filter(item => item.isSelected === true).reduce((pre,cur) => {
        return pre + cur.count * cur.price;
      },0).toFixed(2)
    },
    // 去计算个数
    calculate(){ 
      return this.cartList.filter(item => item.isSelected === true).length
    },
    isSelectAll(){
      if(this.cartList.length === 0) return false;
      return !this.cartList.find(item => !item.isSelected);
    }
  },
  methods:{
    // 全选按钮
    clickChange(){
      // console.log(this.isSelectAll);
      if(this.isSelectAll){
        this.cartList.forEach(item => item.isSelected = false)
      }
      else {
        this.cartList.forEach(item => item.isSelected = true)
      }
      
    },
    calculateClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择商品')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom {
  position: fixed;
  display: flex;
  height: 30px;
  justify-content: space-around;
  align-items: center;
  
  left: 0;
  right: 0;
  bottom: 49px;

  background-color: #fff;

}
.bottom-left {
  display: flex;
  align-items: center;
}
.calculate {
  width: 25vw;
  color: #fff;
  background-color: red;
}
</style>