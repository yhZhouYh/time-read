<template>
  <div id="app">
    <!-- <transition :name="direction"> -->
      <navigation>
        <!-- <keep-alive exclude="read"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->

      </navigation>
    <!-- </transition> -->
    <!-- <circle-loading :showloading="$store.state.loading"></circle-loading> -->
    <transition name="loading">
      <loading v-show="$store.state.loading"></loading>
    </transition>
  </div>
</template>

<script>
// import CircleLoading from './components/common/CircleLoading'
import Loading from './components/common/SVGLoading'
import store from './store'
export default {
  name: 'app',
  components: {
    Loading
    // CircleLoading
  },
  data() {
    return {
      exRoutes: ['home', 'category', 'rank', 'press'],
    }
  },
  // watch: {
  //   '$route'(to, from) {
  //     console.log(from)
  //     if (this.exRoutes.indexOf(from.name) == -1) {
  //       this.direction = this.$store.state.direction
  //     } else {
  //       this.direction = ''
  //     }
  //     console.log(this.direction)
  //   }
  // },
  computed: {
    direction() {
     return this.$store.state.direction
    },
    mode() {
      return this.$store.state.direction == 'forward' ? 'out-in' : ''
    }
  }
}
</script>

<style lang="less">
@import './assets/styles/reset.less';
@import './assets/styles/1px.less';
body {
  font-size: 0.29rem;
}

html {
  min-height: 100%;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e9e9e9;
}

.vux-toast {
  .weui-toast {
    z-index: 10000;
  }
}

.zflex {
  display: flex;
  align-items: center;
}

.zflex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zflex-center {
  justify-content: center;
}

.zflex1 {
  flex: 1;
}

.zicon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  position: relative; //margin: 0 auto;
  vertical-align: middle;
}

.red {
  color: #ff0000;
}

#app .ts-btn {
  background: #ffbf01;
  color: #333;
  &:active {
    background: #eabf7c !important;
    color: #fff !important;
  }
}

// .ts-container {
//   margin-top: 0.85rem;
// }
#app .mu-refresh-control {
  z-index: 10000
}

.book-cover {
  width: 1.74rem;
  box-shadow: 3px 2px 7px 0 #ccc;
}

.back-center {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
}

.loading-enter-active,
.loading-leave-active {
  transition: all .5s
}

.loading-enter,
.loading-leave-to
/* .fade-leave-active in below version 2.1.8 */

{
  opacity: 0;
  transform: scale3d(.3, .3, .3)
}

.avatar {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

div[lazy=loading] {
  opacity: 0;
  transition: opacity 0.3s
}

div[lazy=loaded] {
  opacity: 1;
  transition: opacity 0.3s
}

.ts-index {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ts-container {
  height: 100%;
  padding-top: 0.85rem;
  background: #e9e9e9;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto; // display: flex;
  // flex-direction: column;
}

.word6 {
  color: #666
}

.ts-button {
  display: inline-block;
  padding: 0.1rem 0.36rem;
  border: 1px solid #ffbf01;
  font-size: 0.3rem;
}


// .forward-enter-active {
//   transition: all 0.5s ease;
// }
// .forward-enter {
//   transform: translate3d(20px,0,0); // opacity: 0;
// }
// .forward-leave-active {
//   transform: translateX(-20px);
//   opacity: 0;
// }
// .forward-enter-active{
//   transition: all .3s ease;
//   z-index: 100;
// }
// .forward-enter{
//   transform: translate3d(80%,0,0)
// }
// // .forward-leave-active{
// //   transition: all .5s ease;
// // }
// .forward-leave-to{
//   // opacity:0;
// }
.back-leave-active {
  transition: all .5s ease;
  z-index: 100;
}

// .back-enter{
//   z-index:100;
// }
.back-leave-to {
  z-index: 100;
  transform: translate3d(0, 30px, 0);
  opacity: 0;
}
</style>
