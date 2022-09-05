<template>
  <transition name="el-fade-in-linear">
    <div v-show="drawerShow" :style="wapperStyle" class="drawerCompWapper">
      <div class="modal" :style="modalStyle">
        <transition name="collapse">
          <div v-show="drawerShow" class="container" :style="containerStyle">
            <!-- 头部 -->
            <div v-if="title" class="drawerHeader">
              <div class="title">
                <slot name="drawerHeader">
                  {{ title }}
                </slot>
              </div>
              <div
                v-if="showClose"
                class="close"
                @click="close"
              >
                <i class="el-icon-close" />
              </div>
            </div>
            <!-- 主体内容 -->
            <div class="drawerContent" :style="drawerContent">
              <slot>请添加内容！</slot>
            </div>
            <!-- 底部 -->
            <div v-if="showFooter" class="drawerFooter">
              <slot name="drawerFooter">
                <div class="footerBtn">
                  <c-button
                    @click="close"
                  >
                    取消
                  </c-button>
                  <c-button
                    type="primary"
                    @click="$emit('submit')"
                  >
                    提交
                  </c-button>
                </div>
              </slot>
            </div>
            <!-- 侧边按钮 -->
            <div class="expandIcon" @click="close">
              <i class="el-icon-caret-right" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
const options = {
  mini: "334px",
  small: "608px",
  default: "800px",
  medium: "1070px",
};
export default {
  name: "DrawerComp",
  components: {},
  props: {
    // 是否显示遮罩层 :drawerShow.sync="" 需加 .sync 修饰符
    drawerShow: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示抽屉
    modalShow: {
      type: Boolean,
      default: () => true,
    },
    /** 抽屉大小
     *
     * mini 334px
     * small 608px
     * medium 1070px
     *
     */
    size: {
      type: String,
      default: () => "mini",
    },
    // 抽屉标题
    title: {
      type: String,
      default: undefined,
    },
    // 是否需要头部
    showHeader: {
      type: Boolean,
      default: () => true,
    },
    // 是否需要底部
    showFooter: {
      type: Boolean,
      default: () => false,
    },
    // 是否需要关闭按钮
    showClose: {
      type: Boolean,
      default: () => true,
    },
    // 抽屉层级
    zIndex: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {};
  },
  computed: {
    wapperStyle() {
      return {
        width: this.modalShow ? "100%" : options[this.size],
        height: "100%",
        top: 0,
        zIndex: this.zIndex,
      };
    },
    modalStyle() {
      return {
        width: this.modalShow ? "100%" : options[this.size],
        height: "100%",
        backgroundColor: this.modalShow ? "rgba(0, 0, 0, 0.5)" : "transparent",
      };
    },
    containerStyle() {
      return {
        width: options[this.size],
        top: 0,
      };
    },
    drawerContent() {
      return {
        height: `calc(100% - ${this.showHeader ? "66px" : "0px"} - ${
          this.showFooter ? "64px" : "0px"
        })`,
      };
    },
  },

  methods: {
    close() {
      this.$emit("update:drawerShow", false);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
.drawerCompWapper {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  .container {
    // height: calc(100vh - 64px);
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: -2px 0px 12px 0px rgba(0, 0, 0, 0.09);
    box-sizing: border-box;
    .drawerHeader {
      padding: 20px 24px 12px 24px;
      display: flex;
      justify-content: space-between;
      .title,
      .close {
        font-size: 18px;
        color: #333;
        font-weight: 550 !important;
        line-height: 32px;
        cursor: pointer;
      }
      .close {
        color: #999999;
        .el-icon-close:before {
          font-weight: 600;
          font-size: 22px;
          line-height: 32px;
        }
      }
    }
    .drawerContent {
      width: 100%;
      padding: 0 24px 20px 24px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 4px;
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
      }
      &::-webkit-scrollbar-track {
        display: none;
      }
    }
    .drawerFooter {
      padding-right: 24px;
      position: absolute;
      width: 100%;
      height: 64px;
      box-shadow: 0px -2px 12px 0px rgba(0, 0, 0, 0.06);
      .footerBtn {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .el-button {
          margin-left: 8px;
        }
      }
    }
    .expandIcon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 48px;
      left: -22px;
      background: #ffffff;
      border: 1px solid #f4f4f4;
      border-radius: 8px 0px 0px 8px;
      box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.12);
      text-align: center;
      line-height: 48px;
      cursor: pointer;
      i {
        font-size: 20px;
        vertical-align: sub;
      }
    }
  }
}
</style>

<style lang="scss">
// 渐入渐出
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

// 折叠
.collapse-enter-active {
  transition: all 0.5s;
}
.collapse-leave-active {
  transition: all 1s;
}
.collapse-enter {
  transform: translateX(100%);
}
.collapse-leave-to {
  transform: translateX(200%);
}
</style>
