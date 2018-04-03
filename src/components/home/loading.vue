<template>
    <div class="loadingMan" :class="{animate}"></div>
</template>
<style lang="less">
  .loadingMan{
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-image: url('../../assets/imgs/sprite.png');
    background-size: 14rem 2rem;
    // animation-name: charector-1;/* 动画名称 */
    animation-iteration-count: infinite;/* 动画无限播放 */
    animation-duration: 600ms;/* 动画运行的时间 */
    animation-timing-function: step-start;
    // background-position:0 0; 
    margin:auto;
    top:0;
    left:0;
    right:0;
    z-index:99;
    bottom:0;
    &.animate{
        animation-name: charector-1
    }
    /*background-size: cover;*/
  }
  @keyframes charector-1{
    0% {background-position: 0 0;}
    14.3% {background-position: -2rem 0;}
    28.6% {background-position: -4rem 0;}
    42.9% {background-position: -6rem 0;}
    57.2% {background-position: -8rem 0;}
    71.5% {background-position: -10rem 0;}
    85.8% {background-position: -12rem 0;}
    100% {background-position: 0 0;}
  }
</style>
<script>
  export default{
    props: {
      animate: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
