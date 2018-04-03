<template>
    <div class="ts-index rank-list">
        <z-header bckColor="#3d3c3e">
            <span slot="middle">{{title}}</span>
            <search-icon slot="left"></search-icon>
            <menu-icon :mode="mode" @small="small" @big="big" slot="right"></menu-icon>
        </z-header>
        <div class="ts-container" ref="container">

            <div class="icons-box" :class="{active: scrollTop>2}" v-if="$route.query.category">
                <sort @sort="sort"></sort>
                <!-- <menu-icon :mode="mode" @small="small" @big="big"></menu-icon> -->
            </div>
           
            <scroller-container @scrollFunc="scrollFunc" @scrollFuncing="scrollFuncing" ref="scroller" container="ts-container" :style="{marginTop:$route.query.category?'1rem':0}">
                 <div v-if="list.length">
                <div v-if="mode ==1">
                    <book :bookDetail="item" v-for="(item, index) in list" :key="index" showbtn :index="index + 1" :rank="isRank" @godetail="godetail">
                    </book>
                </div>
                <div class="zflex big-box" v-if="mode == 2">
                    <detail-big :bookDetail="item" v-for="(item, index) in list" :key="index" :index="index + 1" :rank="isRank"></detail-big>
                    <!-- <div class="justify_fix"></div> -->
                </div>
                 </div>
                 <div v-else>
                <div class="nobooks-img">
                    <img src="../../assets/imgs/nobooks.png" alt="">
                    <p>暂无图书</p>
                </div>
                
            </div>
            </scroller-container>
            </div>
            

        </div>
    </div>
</template>
<script>
import book from "./detail";
import { rankList, queryCategoryBook, myBook, myCollect } from "../../api";
import ScrollerContainer from "../common/ScrollerContainer";
import menuIcon from "./menuIcon";
import detailBig from "./detailBig";
import _throttle from "lodash/throttle";
import sort from "./sort";
export default {
  name: "rank-list",
  components: {
    book,
    ScrollerContainer,
    menuIcon,
    detailBig,
    sort
  },
  data() {
    return {
      list: [],
      pn: 1,
      ps: 10,
      total: 0,
      mode: 1,
      scrollTop: 0,
      title: this.$route.query.title,
      cateType: 1,
      cateOrderBy: 0,
      categoryId:
        this.$route.query.categoryId == 0 ? "" : this.$route.query.categoryId
    };
  },
  async created() {
    let data = {};
    if (this.$route.query.rank) {
      data = await rankList({
        type: this.$route.query.type,
        pageNumber: this.pn,
        pageSize: this.ps
      });
    }
    if (this.$route.query.category) {
      data = await queryCategoryBook({
        categoryId: this.categoryId,
        orderBy: this.cateOrderBy,
        pageNumber: this.pn,
        pageSize: this.ps,
        type: this.cateType
      });
    }
    if (this.$route.query.myBook) {
      data = await myBook({
        memberUid: this.$route.query.uid,
        pageNumber: this.pn,
        pageSize: this.ps
      });
    }
    if (this.$route.query.myCollect) {
      data = await myCollect({
        memberUid: this.$route.query.uid,
        pageNumber: this.pn,
        pageSize: this.ps
      });
    }
    if (data.datas && data.datas.length) {
      this.list = data.datas;
      this.total = data.totalPage;
      if (this.pn >= this.total) {
        this.$refs.scroller.destroy();
      }
    }
  },
  computed: {
    isRank() {
      return this.$route.query.rank ? true : false;
    }
  },
  // mounted() {
  //     //记录滚动距离
  //     this.$refs.container.addEventListener('scroll', () => {
  //         this.scrollTop = this.$refs.container.scrollTop
  //         console.log(this.scrollTop)
  //     })
  // },

  activated() {
    //恢复记忆
    this.$refs.container.scrollTop = this.scrollTop;
  },
  methods: {
    async scrollFunc() {
      if (this.$route.query.rank) {
        if (this.pn < this.total) {
          let data = await rankList({
            type: this.$route.query.type,
            pageNumber: ++this.pn,
            pageSize: this.ps
          });
          this.list = this.list.concat(data.datas);
        } else {
          this.$refs.scroller.destroy();
        }
      }

      if (this.$route.query.category) {
        if (this.pn < this.total) {
          let data = await queryCategoryBook({
            categoryId: this.categoryId,
            orderBy: this.cateOrderBy,
            pageNumber: ++this.pn,
            pageSize: this.ps,
            type: this.cateType
          });
          this.list = this.list.concat(data.datas);
        } else {
          this.$refs.scroller.destroy();
        }
      }
      if (this.$route.query.myBook) {
        if (this.pn < this.total) {
          let data = await myBook({
            memberUid: this.$route.query.uid,
            pageNumber: this.pn,
            pageSize: this.ps
          });

          this.list = this.list.concat(data.datas);
        } else {
          this.$refs.scroller.destroy();
        }
      }
      if (this.$route.query.myCollect) {
        if (this.pn < this.total) {
          let data = await myCollect({
            memberUid: this.$route.query.uid,
            pageNumber: this.pn,
            pageSize: this.ps
          });

          this.list = this.list.concat(data.datas);
        } else {
          this.$refs.scroller.destroy();
        }
      }
    },
    scrollFuncing() {
      //记录滚动距离
      this.scrollTop = this.$refs.container.scrollTop;
    },
    small() {
      this.mode = 1;
    },
    big() {
      this.mode = 2;
    },
    async sort(type, orderby) {
      this.scrollTop = 0;
      this.$refs.container.scrollTop = 0;
      this.pn = 1;
      this.cateType = type;
      let data = await queryCategoryBook({
        categoryId: this.categoryId,
        orderBy: orderby == undefined ? 0 : orderby,
        pageNumber: this.pn,
        pageSize: this.ps,
        type
      });
      this.list = data.datas;
    },
    godetail(bookId) {
      this.$router.push({ name: "bookDetail", params: { bookId } });
    }
  }
};
</script>
<style lang="less">
.icons-box {
  padding: 0.22rem;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 200;
  background: #e9e9e9;
  transition: all 0.3s;
  &.active {
    background: #fff; // border-bottom:1px solid #e9e9e9;
    box-shadow: 0 2px 7px 0 #ccc;
  }
  .menu-icons {
    float: right;
  }
  .sort-groups {
    float: left;
  } // justify-content: space-between;
}

.big-box {
  background: #fff;
  text-align: justify;
  padding: 0.3rem 0.4rem;
  flex-wrap: wrap;
  justify-content: space-between;
  &:after {
    content: "";
    width: 3.04rem;
  }
}

.rank-list {
  .ts-box .book-info .booktitle {
    display: inline-block;
    width: 2.5rem;
  }
  .author{
    width:2.5rem;
  }
}
.nobooks-img {
  position: absolute;
  left: 0;
  right: 0;
  top: 3.7rem;
  margin: 0 auto;
  width: 2.28rem;
  text-align: center;
  p {
    margin-top: 0.2rem;
    color: #adadad;
  }
}

// .justify_fix{display:inline-block; width:100%; height:0; overflow:hidden;}
</style>
