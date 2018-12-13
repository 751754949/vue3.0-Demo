<template>
  <div class="model_container">
    <div class="hide_dialog el-icon-close" v-show="closeBtnVisible" @click="closeModal"></div>
    <div class="main_content" v-loading="isLoading">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * @description: 全屏模态框
 * @author: Lht
 * @dete: 2018-12
 * @example:  <Modal v-if="dialogFormVisible" @closeDialog="dialogFormVisible=false">  内容  </Modal>
 */
export default {
  name: "Modal",
  props: {
    isLoading: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data(){
    return{
      closeBtnVisible: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeDialog");
    },
    /**
     * @description: 控制是否显示关闭按钮
     */
    hideCloseBtn(){
      this.closeBtnVisible = !(this.closeBtnVisible);
    }
  },
  created(){
    // this.$bus.on("hideCloseBtn",this.hideCloseBtn);
  },
  beforeDestroy(){
    // this.$bus.off("hideCloseBtn")
  }
};
</script>

<style scoped>
/* loading 的 z-inidex: 2000; */
.model_container {
  width: 100%;
  height: 100%;
  z-index: 2001;
  position: fixed;
  top: 0;
  right: 0;
  background: #ffffff;
}

.main_content {
  background: #ffffff;
  position: relative;
  min-height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  height: 100%;
}

.hide_dialog{
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 2001;
  right: 0;
  top: 0;
  /* text-align: center; */
  line-height: 50px;
  font-size: 34px;
  color: #333333;
}
.hide_dialog:hover{
  cursor: pointer;
}

</style>
