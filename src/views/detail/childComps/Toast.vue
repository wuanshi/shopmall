<template>
  <div class="center-toast" v-show="isShow">
    <span class="message">{{message}}</span>
  </div>
</template>

<script>
export default {
  props:{
    message:{
      type:String,
      default:''
    },
    isShow:false
  }
}
</script>

<style scoped>
  .center-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .message {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
  }
</style>