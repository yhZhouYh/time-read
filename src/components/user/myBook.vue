<template>
   <div class="ts-index ts-my-book">
         <z-header bckColor="#3d3c3e">
            <span slot="middle">我的图书</span>
            <search-icon slot="left"></search-icon>
      <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container" ref="container">
             <scroller-container @scrollFunc="scrollFunc" ref="scroller" container="ts-container">
                 <message v-for="(msg,index) in msgs" :msg="msg" :key="index"></message>
            </scroller-container>
        </div>
    </div>
</template>
<script>
import ScrollerContainer from "../common/ScrollerContainer";
export default {

};
</script>
<style lang="less">

</style>
