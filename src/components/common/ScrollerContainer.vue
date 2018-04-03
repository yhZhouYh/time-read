<template>
    <div class="scroller-container" ref="scroller">
        <slot></slot>
        <div class="loading-box">
            <loading v-if="showLoading && showLoad"></loading>
            <divider class="divider-box" text="没有更多了~" v-else></divider>
        </div>
    </div>
</template>
<script>
import _throttle from "lodash/throttle";
import loading from "./SVGLoading";
import divider from "./divider";
export default {
  name: "s-container",
  components: {
    loading,
    divider
  },
  data() {
    return {
      scroller: null,
      throFunc: null,
      box: null,
      // showLoading: true
      showLoad: true
    };
  },
  props: {
    container: {
      type: String
    },
    delay: {
      type: Number,
      default: 200
    },
    gap: {
      type: Number,
      default: 0
    },
    showLoading: {
      type: Boolean,
      default: true
    }
    // showLoading: {
    //     type: Boolean,
    //     default: true
    // }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    init() {
      this.scroller = this.$refs.scroller;

      this.throFunc = _throttle(this.scrollFunc, this.delay);
      let container = this.$parent.$refs.container;
      if (container) {
        this.box = container;
        this.box.addEventListener("scroll", this.throFunc);
      } else {
        this.box = this.container
          ? document.querySelector("." + this.container)
          : window;
        this.box.addEventListener("scroll", this.throFunc);
      }
    },
    scrollFunc() {
        
      let isBottom = this.getRect(this.scroller).isBottom;
      this.$emit("scrollFuncing");
      if (isBottom) {
        this.$emit("scrollFunc");
      }
    },
    getRect(ele) {
      var inHeight = window.innerHeight,
        rect = ele.getBoundingClientRect();
      rect.isVisible = rect.top - inHeight < this.gap; // 是否在可视区域
      rect.isBottom = rect.bottom - inHeight <= this.gap + 5; //弹性值
      return rect;
    },
    destroy() {
      this.showLoad = false;
      this.box.removeEventListener("scroll", this.throFunc);
    }
  }
};
</script>
<style lang="less">
.scroller-container {
  .loading-box {
    text-align: center;
    .word6 {
      padding: 0.2rem 0;
    }
  }
  .svg-loading {
    position: relative;
    top: 0;
  }
  .divider-box {
    padding: 0.2rem;
    color: #666;
    font-size: 14px;
  }
}
</style>
