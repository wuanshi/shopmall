<template>
  <div v-if="Object.keys(goodParams).length != 0">
    <div>{{goodParams.rule.key}}</div>
    <table>
      <tr v-for="item in goodParams.rule.tables[0]" :key="item[0]">
        <td v-for="(size,index) in item" :key="index">
          {{size}}
        </td>
      </tr>
    </table>
    <div>{{goodParams.rule.disclaimer}}</div>
    <table>
      <tr v-for="(item,index) in goodParams.info.set" :key="index">
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    goodParams: {
      type: Object,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>