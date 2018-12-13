<template>
  <ul class="tabs">
    <li  v-for="(item,index) in tabsArr" :key="index" 
    :class="['base_list',index == currentIndex ? 'click_list' : '',tabsArr.length == 1 ? 'set_list' : 'default_list']"
    @click="isChoose(item,index)"
    >{{item.rootName}}</li>
  </ul>
</template>
<script>
export default {
  props: {
    tabsArr: {
      type: Array
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    isChoose(item, index) {
      this.currentIndex = index;
      this.$emit("changeIndex", item, index);
    }
  }
};
</script>
<style lang="less" scoped>
.tabs {
  display: flex;
  flex-flow: row nowwrap;
  overflow: hidden;
  justify-content: center;
}
.base_list {
  text-align: center;
  min-width: 75px;
  height: 75px;
  line-height: 75px;
  cursor: pointer;
  font-size: 14px;
  font-family: "微软雅黑";
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: 0.6s all ease;
  color: #107472;
}
.default_list {
  flex: 1;
}
.set_list {
  width: 160px;
}
.click_list {
  border-bottom-color: #01988c !important;
}
</style>

