<template>
    <div class="ts-index ts-search">
        <z-header bckColor="#3d3c3e">
            <!-- <div slot="middle" class="search-input"> -->
            <input type="text" class="search-input" slot="middle" placeholder="搜索书名/作者" v-model="text" ref="input">
            <!-- </div> -->
             <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container" ref="container">
            <div class="key-words" v-if="!result.length">
                <div class="title">大家都在搜</div>
                <span class="words" v-for="(item, index) in keyWords" :key="index" @click="getResultByKeyWord(item.word)">{{item.word}}</span>
            </div>
            <scroller-container @scrollFunc="scrollFunc" ref="scroller" container="ts-container" v-if="result.length">
                <div v-if="result.length">
                    <book :bookDetail="item" v-for="(item, index) in result" :key="index" showbtn :index="index + 1" @godetail="godetail">
                    </book>
                </div>
            </scroller-container>
            <div v-if="!result.length && text">
                <div class="nobooks-img">
                    <img src="../../assets/imgs/nobooks.png" alt="">
                    <p>暂无搜索结果</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import _debounce from 'lodash/debounce'
import { searchBook, keyWord } from '../../api'
import ScrollerContainer from '../common/ScrollerContainer'
import book from '../book/detail'
export default {
  name: 'search',
  components: {
    ScrollerContainer,
    book
  },
  data() {
    return {
      text: '',
      result: [],
      pn: 1,
      ps: 15,
      total: 0,
      keyWords: []
    }
  },
  async created() {
    this.keyWords = await keyWord()
  },
  mounted() {
    let searchInput = this.$refs.input
    searchInput.addEventListener('input', _debounce(this.search, 500), false)
  },
  methods: {
    async search() {
      if (this.text) {
        let data = await searchBook({
          searchKey: this.text,
          pageNumber: this.pn,
          pageSize: this.ps
        })

        // if (data.datas && data.datas.length) {
        this.result = data.datas
        this.total = data.totalPage
        this.$nextTick(() => {
          this.$refs.scroller.showLoad = true
          if (this.pn >= this.total) {
            this.$refs.scroller.showLoad = false
          }
        })
        // }
      }
    },
    async scrollFunc() {
      if (this.pn < this.total) {
        let data = await searchBook({
          searchKey: this.text,
          pageNumber: ++this.pn,
          pageSize: this.ps
        })
        this.result = this.result.concat(data.datas)
      } else {
        this.$refs.scroller.showLoad = false
      }
    },
    godetail(bookId) {
      this.$router.push({ name: 'bookDetail', params: { bookId } })
    },
    getResultByKeyWord(word) {
      this.text = word
      this.search()
    }
  }
}
</script>
<style lang="less">
.ts-search {
  .ts-container {
    background: #fff;
  }
}
.search-input {
  width: 5.2rem;
  border-radius: 20px;
  background: #646365;
  font-size: 0.29rem;
  border: 0;
  outline: none;
  display: inline-block;
  padding: 0.11rem 0.2rem;
  color: #fff;
}
.nobooks-img {
  position: absolute;
  left: 0;
  right: 0;
//   margin: 3.7rem auto 0;
  top: 3.7rem;
  margin: 0 auto;
  width: 2.28rem;
  text-align: center;
  p {
    margin-top: 0.2rem;
    color: #adadad;
  }
}
.key-words {
  padding: 0.2rem;
  .title {
    font-size: 0.26rem;
    color: #999999;
  }
  .words {
    padding: 0.15rem 0.25rem;
    background: #f4f4f4;
    display: inline-block;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
    border-radius: 5px;
    color: #666666;
  }
}
</style>
