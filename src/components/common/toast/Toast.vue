<template>
  <div class="center-toast" v-show="isShow">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      message:'',
    }
  },
  methods:{
    show(message = '默认参数',duration = 2000){
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      },duration)
    }
  }
}
</script>

<style scoped>
  .center-toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 999;
  }
  .message {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
  }
</style>