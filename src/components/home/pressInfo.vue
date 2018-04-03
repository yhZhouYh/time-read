<template>
    <div class="ts-index ts-pressInfo">
        <z-header bckColor="#ffbf01">
            <span slot="middle">出版社</span>
            <search-icon slot="left"></search-icon>
            <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container" ref="container">
            <div class="press-cover">
                <p class="press-name">
                    {{title}}
                </p>
                <p class="press-common">
                    -官方旗舰店-
                </p>
            </div>

            <home-box :items="items1" title="热门推荐" type="1" :showMore="false"></home-box>
            <home-box :items="items2" title="最新图书" type="2" :showMore="false"></home-box>
        </div>
    </div>
</template>
<script>
import homeBox from './homeBox'
import { hotRecommend, latestBooks } from '../../api'
export default {
  name: 'press-info',
  components: {
    homeBox
  },
  data() {
    return {
      items1: [],
      items2: [],
      pressId: this.$route.params.pressId,
      title: this.$route.query.title
    }
  },
  async created() {
    let [data1, data2] = await Promise.all([
      hotRecommend({ number: 10, pressId: this.pressId }),
      latestBooks({ pageNumber: 1, pageSize: 10, pressId: this.pressId })
    ])
    this.items1 = data1
    this.items2 = data2.datas
  }
}
</script>
<style lang="less">
.press-cover {
  width: 100%;
  height: 2.4rem;
  background-size: cover;
  background-position: 50%;
  background-image: url('../../assets/imgs/pressBack.jpg');
  .press-name {
    padding-top: 0.6rem;
    font-size: 20px;
  }
  p {
    color: #efc343;
    font-size: 17px;
    text-align: center;
  }
}
</style>
