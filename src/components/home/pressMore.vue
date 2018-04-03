<template>
    <div class="ts-index ts-more-press">
        <z-header bckColor="#3d3c3e">
            <span slot="middle">出版社</span>
            <icon slot="right" icon="icon-sousuo1"></icon>
            <icon slot="right" icon="icon-shouye"></icon>
        </z-header>
        <div class="ts-container" ref="container">
            <scroller-container @scrollFunc="scrollFunc" @scrollFuncing="scrollFuncing" ref="scroller" container="ts-container">
                <div v-if="press.length">
                    <div class="ts-press-box">
                        <div class="press-box-scroller zflex">
                            <div class="press-img tf-1px" v-for="(item,index) in press" :key="index" @click="gopressInfo(item)">
                                <div class="back-center" v-lazy:background-image="item.logo + '@332w'"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="nobooks-img">
                    <img src="../../assets/imgs/nobooks.png" alt="">
                    <p>暂无出版社</p>
                </div>

            </scroller-container>
        </div>
    </div>
</template>
<script>
import ScrollerContainer from '../common/ScrollerContainer'
import { joinPressInfo } from '../../api'
export default {
  name: 'more-press',
  components: {
    ScrollerContainer,
  },
  data() {
    return {
      ps: 15,
      pn: 1,
      press: [],
      total: 0
    }
  },
  async created() {
    let data = await joinPressInfo({ pageNumber: this.pn, pageSize: this.ps })

    if (data.datas && data.datas.length) {
      this.press = data.datas
      this.total = data.totalPage
      if (this.pn >= this.total) {
        this.$refs.scroller.destroy()
      }
    }
  },
    activated() {
    //恢复记忆
    this.$refs.container.scrollTop = this.scrollTop;
  },
  methods: {
    async scrollFunc() {
      if (this.pn < this.total) {
        let data = await joinPressInfo({
          pageNumber: ++this.pn,
          pageSize: this.ps
        })
        this.press = this.press.concat(data.datas)
      } else {
        this.$refs.scroller.destroy()
      }
    },
    scrollFuncing() {
      //记录滚动距离
      this.scrollTop = this.$refs.container.scrollTop;
    },
    gopressInfo(item){
      this.$router.push({name: 'pressInfo', params: {pressId: item.uid},query: {title: item.company_name}})
    }
  }
}
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
