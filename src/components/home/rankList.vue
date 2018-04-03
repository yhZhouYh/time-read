<template>
  <div class="ts-rank-list">
      <home-box :items="items1" title="畅销榜" type="1"></home-box>
      <home-box :items="items2" title="新书榜" type="1"></home-box>
      <home-box :items="items3" title="热搜榜" type="1"></home-box>
      <home-box :items="items4" title="人气榜" type="1"></home-box>
      <home-box :items="items5" title="免费榜" type="1"></home-box>
  </div>
</template>
<script>
import homeBox from "./homeBox";
import { rankList } from "../../api";
export default {
  name: "rank-list",
  components: {
    homeBox
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false;
    },
    account() {
      return this.$store.state.account;
    }
  },
  data() {
    return {
      pn: 1,
      ps: 10,
      items1: [],
      items2: [],
      items3: [],
      items4: [],
      items5: []
    };
  },
  async created() {
     let items1 = await rankList({ type: 1, pageNumber: this.pn, pageSize: this.ps })
     let items2 = await rankList({ type: 2, pageNumber: this.pn, pageSize: this.ps })  
     let items3 = await rankList({ type: 3, pageNumber: this.pn, pageSize: this.ps })  
     let items4 = await rankList({ type: 4, pageNumber: this.pn, pageSize: this.ps })  
     let items5 = await rankList({ type: 5, pageNumber: this.pn, pageSize: this.ps })       
    // let [items1, items2, items3, items4, items5] = await Promise.all([
    //   rankList({ type: 1, pageNumber: this.pn, pageSize: this.ps }),
    //   rankList({ type: 2, pageNumber: this.pn, pageSize: this.ps }),
    //   rankList({ type: 3, pageNumber: this.pn, pageSize: this.ps }),
    //   rankList({ type: 4, pageNumber: this.pn, pageSize: this.ps }),
    //   rankList({ type: 5, pageNumber: this.pn, pageSize: this.ps })
    // ]);
    this.items1 = items1.datas;
    this.items2 = items2.datas;
    this.items3 = items3.datas;
    this.items4 = items4.datas;
    this.items5 = items5.datas;
  }
};
</script>
<style lang="less">

</style>
