import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart:[],
  },
  getters:{
    cartLength(state) {
      return state.cart.length;
    },
    cartList(state){
      return state.cart
    }
  },
  mutations: {
    addToCart(state,payload){
      payload.count = 1;
      payload.isSelected = false;
      state.cart.push(payload);
    },
    addCount(state,payload){
      state.cart.find(item => {
        if(item.iid === payload.iid)
        {
          item.count++;
          return true
        }
      })
    }
  },
  actions: {
    // actions 可以返回一个 Promise  
    addCart(context,payload){
     return new Promise((resolve,reject)=>{
      const oldProduce = context.state.cart.find(item => item.iid === payload.iid)
      if(oldProduce){//商品 +1
        context.commit('addCount',payload)
        resolve('当前商品数量+1');
      }else{//添加商品
        context.commit('addToCart',payload)
        resolve('添加了新的商品');
      }
     })
    }
  },
  modules: {
    
  }
})
