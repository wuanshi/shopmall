<template>
  <div class="tab-control">
    <div v-for="( item,index ) in titles" :key="item" class="tab-control-item" :class="{active:currentIndex === index}" @click="itemChange(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return {
      currentIndex:0,
    }
  },
  methods:{
    itemChange(index){
      this.currentIndex = index;
      this.$emit('TabClick',index)
    }
  }
};
</script>

<style>
.tab-control {
  display: flex;
  padding: 3px 0;
  z-index: 9;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>