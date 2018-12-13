<template>
  <div class="service_wrap">
    <!-- header -->
    <header class="svc_hd">
      <div class="left_setting">
        <h1 class="tb_logo">
          <img src="@/assets/img/logo.png" alt="mapwayserver">
          mapwayserver 服务平台
        </h1>
        <!-- tabs -->
        <ul class="svc_tabs">
          <li
            v-for="(o,i) in tabsList"
            :key="i"
            @click="toggleTabs(o,i)"
            :class="currentIndex === i ? 'active':''"
          >{{o.label}}</li>
        </ul>
      </div>
      <div class="right_setting">
        <span @click="jumpHelp">帮助</span>
        <span class="api_ref" @click="jumpApiRef">API参考</span>
        <span class="backstage_manage" @click="jumpLogin">后台管理</span>
      </div>
    </header>
    <!-- main -->
    <main class="svc_main">
      <div class="content">
        <div>
          <ul class="clearfix" v-if="this.currentIndex === 0">
            <li class="itm" v-for="(item,index) in servicedata" :key="index">
              <img src="@/assets/img/no-service.png" alt="默認">
              <p class="classify">
                <span class="type">{{item.SERVICETYPE === "BaseMapServer" ? "基础地图" :"要素底图"}}</span>
                <span class="name">{{item.ID}}</span>
              </p>
              <p class="url">{{item.NAME}}</p>
              <p class="public_time">发布时间： {{currentYear}}</p>
            </li>
          </ul>
          <div v-else>dsfggdfgdgfd</div>
        </div>
        <!-- 分頁器 -->
        <div class="pagination" v-if="pagination.total > pagination.pageSize">
          <el-pagination
            background
            class="page"
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            :current-page="pagination.currentPage1"
          ></el-pagination>
        </div>
      </div>
    </main>
    <!-- footer -->
    <footer class="svc_ft">版权所有 © 2013 - {{currentYear}} 西安天邦测绘科技有限公司</footer>
  </div>
</template>

<script>
import Tabs from "@/components/template/Tabs.vue";
export default {
  name: "DisplayService",
  components() {
    Tabs;
  },
  computed: {
    currentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  },
  data() {
    return {
      // tabs 配置
      tabsList: [
        { label: "服务", value: "service" },
        { label: "文件夹", value: "folder" }
      ],
      currentIndex: 0,
      //  分页的配置
      pagination: {
        currentPage1: 1,
        total: null,
        pageSize: 12
      },
      servicedata: null,
      serviceArry: null
    };
  },
  methods: {
    /**
     * 选择数据源
     */
    toggleTabs(item, index) {
      this.currentIndex = index;
      console.log(index);
    },
    /**
     * @description: 获取服务数据
     */
    getServiceData(url) {
      var that = this;
      that.$http.get(url).then(function(res) {
        let serviceList = res.data;
        if (serviceList) {
          //  将服务列表分组，每组10个
          that.serviceArry = that.groupData(
            serviceList,
            that.pagination.pageSize
          );
          that.pagination.total = serviceList.length;
          that.servicedata = that.serviceArry[0];
        } else {
          //console.info("暂无数据");
          //清空数据，并且重置数据条数为0、默认显示第一页，
          that.servicedata = null;
          that.pagination.total = 0;
          that.pagination.currentPage1 = 1;
        }
      });
    },
    //  从数组中取固定个数组成新数组
    groupData(array, gap) {
      var result = [];
      for (var i = 0, len = array.length; i < len; i += gap) {
        result.push(array.slice(i, i + gap));
      }
      return result;
    },
    //  分页开始
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      //console.log(`当前页: ${val}`);
      this.servicedata = this.serviceArry[val - 1];
    },
    /**
     * @description: 跳转帮助文档界面
     */
    jumpHelp() {
      this.$message({
        message: "此功能正在开发！",
        type: "success"
      });
    },
    /**
     * @description: 跳转登录界面
     */
    jumpApiRef() {
      //   window.open("www.baidu.com");
      this.$message({
        message: "此功能正在开发！",
        type: "success"
      });
    },
    /**
     * @description: 跳转登录界面
     */
    jumpLogin() {
      this.$router.replace("login");
    }
  },
  created() {
    this.getServiceData("system/manager/serviceManager");
  }
};
</script>
<style lang="less" scoped>
@import "@/assets/css/base.less";
@svc_font_family: "Microsoft YaHei \5FAE\8F6F\96C5\9ED1";
@svc_font_size: 14px;
.hide_scrollbar();

.service_wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column wrap;
  .svc_hd {
    width: 100%;
    height: 60px;
    color: #323232;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;

    h1 {
      font-size: 0;
    }
    .left_setting {
      display: flex;
      flex-flow: row nowrap;
      .tb_logo {
        margin: 0 70px 0 112px;
      }
      img {
        display: block;
      }

      .svc_tabs {
        display: flex;
        flex-flow: row nowrap;
        li {
          // padding: 0 10px;
          margin-right: 60px;
          .set_cursor();
          .set-font(16px, 49px);
          border-bottom: 2px solid transparent;
          box-sizing: border-box;
          transition: all 0.3s linear;
        }
        .active {
          color: #00958f;
          border-bottom-color: #00958f;
        }
      }
    }

    .right_setting {
      margin-right: 36px;
      font-family: @svc_font_family;
      font-size: @svc_font_size;
      display: flex;
      flex-flow: row nowrap;
      span {
        .set-font(14px, 32px);
        display: block;
        .set_cursor();
      }
      .api_ref {
        margin: 0 34px 0 30px;
      }

      .backstage_manage {
        width: 104px;
        background-color: #00958f;
        color: #fffdfe;
        text-align: center;
        .set-border-radius(@radius:16px);
        .set-font(14px, 32px);
      }
    }
  }
  // 服务内容
  .svc_main {
    height: calc(100% - 100px);
    background-color: #f4f4f4;
    .content {
      width: 74%;
      height: 100%;
      margin: 0 auto;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }
    ul {
      width: 100%;
      padding: 66px 0;
      margin-left: -20px;

      // 980px;
      // 138px;

      .itm {
        width: 216px;
        height: 334px;
        .set-border-radius(@radius:4px);
        font-family: @svc_font_family;
        background-color: #ffffff;
        overflow: hidden;
        float: left;
        margin-left: 20px;
        margin-top: 20px;

        border: 1px solid #ccc;
        box-sizing: border-box;
      }
      img {
        display: block;
        width: 100%;
        margin-bottom: 14px;
      }
      p {
        padding: 0 10px;
        box-sizing: border-box;
      }
      .classify {
        display: flex;
        flex-flow: row nowrap;
        .type {
          border: 1px solid #00958f;
          color: #00958f;
          padding: 4px 5px;
          font-size: 14px;
          .set-border-radius(@radius:4px);
        }
        .name {
          width: 84px;
          color: #343434;
          display: block;
          margin-left: 10px;
          .set-text-ellipsis();
          .set-font(12px, 24px);
        }
      }
      .url {
        height: calc(100% - 14px - 24px - 41px - 180px);
        .set-font(12px, 20px);
        color: #9a9a9a;
        padding: 10px 10px;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
        white-space: normal;
      }
      .public_time {
        border-top: 1px solid #f0f0f0;
        height: 40px;
        color: #999999;
        font-size: 12px;
        line-height: 40px;
        .set-text-ellipsis();
      }
    }

    .pagination {
      // position: absolute;
      // left: 0;
      // bottom: 0;
      height: 14%;
      display: flex;
      justify-content: center;
      width: 100%;

      height: 138px;
      .page {
        margin-top: 28px;
      }
    }
  }

  .svc_ft {
    width: 100%;
    height: 40px;
    background-color: #1f1f21;
    color: #999999;
    text-align: center;
    line-height: 40px;
    font-size: @svc_font_size;
    font-family: @svc_font_family;
  }
}
</style>
