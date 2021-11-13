<template>
  <div>
    <div
      class="check-button"
      :class="{ 'select-active': isSelected }"
      @click="clickChange"
    >
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props:{
    isSelected:false
  },
  methods: {
    clickChange() {
      this.$emit("clickChange")
    },

  },
};
</script>

<style scoped>
.check-button {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  
}
.select-active {
  /* background-image: require('~assets/img/cart/tick.svg'); */
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>