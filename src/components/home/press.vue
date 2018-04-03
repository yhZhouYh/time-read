<template>
    <div class="ts-press">
        <div class="carousel">
            <carousel :imgs="imgs" dotColor="#ffbf01" @itemClick="itemClick"></carousel>
        </div>
       
            <div class="ts-press-box">
                <div class="title zflex">
                    <span class="zflex1">入驻机构</span>
                    <span class="right-word" @click="goMore">全部</span>
                    <span class="arrowright"></span>
                    </div>
                <div class="press-box-scroller zflex">
                    <div class="press-img tf-1px" v-for="(item,index) in press" :key="index" @click="gopressInfo(item)">
                        <div class="back-center" v-lazy:background-image="item.logo + '@332w'" ></div>
                    </div>
                </div>
            </div>
        
    </div>
</template>
<script>
import Carousel from "../common/Carousel";
import ScrollerContainer from "../common/ScrollerContainer";
import { joinPressInfo } from "../../api";
export default {
  name: "press",
  components: {
    Carousel,
    ScrollerContainer
  },
  data() {
    return {
      imgs: [
        require("../../assets/imgs/press.jpg"),
        require("../../assets/imgs/press.jpg")
      ],
      ps: 10,
      pn: 1,
      press: []
    };
  },
  async created() {
    let data = await joinPressInfo({ pageNumber: this.pn, pageSize: this.ps });
    if (data.datas && data.datas.length) {
      this.press = data.datas;
      this.total = data.totalPage;
      if (this.pn >= this.total) {
        this.$refs.scroller.destroy();
      }
    }
  },
  methods: {
    itemClick() {},
    async scrollFunc() {
      if (this.pn < this.total) {
        let data = await joinPressInfo({
          pageNumber: ++this.pn,
          pageSize: this.ps
        });
        this.press = this.press.concat(data.datas);
      } else {
        this.$refs.scroller.destroy();
      }
    },
    gopressInfo(item){
      this.$router.push({name: 'pressInfo', params: {pressId: item.uid},query: {title: item.company_name}})
    },
    goMore(){
      this.$router.push({name: 'pressMore'})
    }
  }
};
</script>
<style lang="less">
@import "../../assets/styles/setArrow.less";
.ts-press-box {
  background: #fff;
  padding: 0.28rem 0.28rem 0.1rem;
  margin-top: 0.2rem;
  //   height: 9.2rem;
  //   overflow: auto;
  //   -webkit-overflow-scrolling: touch;
  .press-box-scroller {
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .title {
    padding-left: 0.15rem;
    border-left: 4px solid #ffbf01;
    line-height: 1.3;
    margin-bottom: 0.2rem;
  }
}
.press-img {
  width: 3.32rem;
  height: 1.66rem;
  //   background-position: center center;
  //   background-size: cover;
  margin-bottom: 0.2rem;
  overflow: hidden;
  padding: 0.1rem;
  //   background-repeat:no-repeat;
}
.arrowright {
  .setArrow(right, 0.18rem, #b1b1b1, 1px); // margin-left:0.1rem;
}
.right-word {
  padding-right: 0.1rem;
  color: #b1b1b1;
}
</style>
