<template>
    <div class="ts-index ts-user">
         <z-header bckColor="#3d3c3e">
            <span slot="middle">我的消息</span>
            <search-icon slot="left"></search-icon>
      <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container" ref="container">
             <scroller-container @scrollFunc="scrollFunc" ref="scroller" container="ts-container">
               <div v-if="msgs.length">
                 <message v-for="(msg,index) in msgs" :msg="msg" :key="index"></message>
               </div>
               <div v-else class="nobooks-img">
                  <img src="../../assets/imgs/nobooks.png" alt="">
                    <p>暂无消息</p>
               </div>
                 
            </scroller-container>
        </div>
    </div>
</template>
<script>
import ScrollerContainer from "../common/ScrollerContainer";
import message from "./message";
import { getMessage } from "../../api";
export default {
  name: "my-message",
  components: {
    ScrollerContainer,
    message
  },
  data() {
    return {
      ps: 15,
      pn: 1,
      msgs: [],
      total: 0
    };
  },
  async created() {
    let data = await getMessage({ pageNumber: this.pn, pageSize: this.ps });

    if (data.datas && data.datas.length) {
      this.msgs = data.datas;
      this.total = data.totalPage;
      if (this.pn >= this.total) {
        this.$refs.scroller.destroy();
      }
    }
  },
  methods: {
    async scrollFunc() {
      if (this.pn < this.total) {
        let data = await getMessage({
          pageNumber: ++this.pn,
          pageSize: this.ps
        });
        this.msgs = this.msgs.concat(data.datas);
      } else {
        this.$refs.scroller.destroy();
      }
    }
  }
};
</script>
<style lang="less">
.nobooks-img {
  position: absolute;
  left: 0;
  right: 0;
  margin: 3.7rem auto 0;
  width: 2.28rem;
  text-align: center;
  p {
    margin-top: 0.2rem;
    color: #adadad;
  }
}
</style>
