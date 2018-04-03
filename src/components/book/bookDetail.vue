<template>
    <div class="ts-index ts-book-detail">
        <z-header bckColor="#3d3c3e">
            <span slot="middle">图书详情</span>
            <icon slot="right" icon="icon-shoucang" color="#ffbf01" v-if="isLogin" v-show="bookDetail.isCollect" @click.native="collect(bookDetail.isCollect)"></icon>
            <icon slot="right" icon="icon-shoucang1" v-if="isLogin" v-show="!bookDetail.isCollect" @click.native="collect(bookDetail.isCollect)"></icon>
            <!-- <icon slot="right" icon="icon-shouye"></icon> -->
            <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container">
            <book :bookDetail="bookDetail" showComment>
                <div class="detail-plus">
                    <span class="button detail-btn read" v-touch-ripple @click="read">阅读</span>
                    <span class="button detail-btn buy" v-touch-ripple @click="buy" v-if="!bookDetail.isBuy && bookDetail.discountPrice > 0">购买</span>
                    <span class="button detail-btn buy disable" v-touch-ripple  v-if="bookDetail.isBuy">已购</span>
                    <!-- <div class="icon-divs">
                        <div class="icon-groups">
                            <icon icon="icon-fenxiang"></icon>
                            <p>分享</p>
                        </div>
                        <div class="icon-groups">
                            <icon icon="icon-zengsong"></icon>
                            <p>赠送</p>
                        </div>
                    </div> -->
                </div>
            </book>
            <div class="details-box">
                <tab active-color="#f6c243">
                    <tab-item selected @on-item-click="clickItem">简介</tab-item>
                    <tab-item @on-item-click="clickItem">目录
                        <span v-if="chapter.length">({{chapter.length}})</span>
                    </tab-item>
                    <tab-item @on-item-click="clickItem">评论
                        <span>({{bookDetail.commentNum}})</span>
                    </tab-item>
                </tab>
                <div class="items-desc-box" v-show="item == 0">
                    <div class="items-box" ref="itembox" :style="{maxHeight: expandHeight}">
                        <div class="items-desc" ref="desc">
                            <span>{{bookDetail.description}}</span>
                        </div>
                        <div class="ts-mask" v-show="showMask && !expanded"></div>
                    </div>
                    <div class="expand" v-show="showMask">
                        <span class="down-arrow" :class="{reverse: expanded}" @click="expanddown"></span>
                        <!-- <span class="up-arrow" v-show="expanded" @click="expandup"></span> -->
                    </div>
                </div>
                <div class="items-menu-box" v-show="item == 1">
                    <ul class="menu-content">
                        <tree-item :model="item" v-for="(item, index) in chapter" :key="item.id" @getChapter="getChapter" v-if="index < 6"></tree-item>
                        <!-- <div class="ts-mask" v-if="chapter.length > 6"></div> -->
                        <div class="more" v-if="chapter.length > 6" @click="moreMenu">更多目录
                            <span class="arrowright"></span>
                        </div>
                    </ul>
                </div>
                <div class="items-comment-box" v-show="item == 2">
                    <comment :datas="comment" :bookId="bookId" :length="commentLength" showMore></comment>
                    <div v-if="!comment.length" class="nocomments">暂无评论</div>
                </div>

            </div>
            <div class="details-box">
                <div class="detail-box-title tf-1px-b">
                    <div class="content zflex">
                        <span class="zflex1">{{bookDetail.pressName}}</span>
                        <span class="right-word" @click="gopressInfo">进入书店</span>
                        <span class="arrowright"></span>
                    </div>
                </div>
                <div class="press-container">
                    <div class="press-box tf-1px" :style="{backgroundImage: 'url('+bookDetail.pressDto.logo+')'}" v-if="bookDetail.pressDto"></div>
                </div>
            </div>
            <div class="details-box">
                <div class="detail-box-title tf-1px-b">
                    <div class="content zflex">
                        <span class="zflex1">热门书籍</span>
                        <span class="right-word" @click="changeMore">换一批</span>
                    </div>
                </div>
                <div class="hot-books-container zflex">
                        <detail-big :bookDetail="item" v-for="(item, index) in currentHotBooks" :key="index" :index="index + 1"></detail-big>
                    </div>
            </div>

        </div>
    </div>
</template>
<script>
import book from "./detail";
import {
  bookDetails,
  getMenu,
  getComment,
  createOrder,
  indexBook,
  collectBook,
  cancelCollectBook
} from "../../api";
import Tab from "vux/src/components/tab/tab.vue";
import TabItem from "vux/src/components/tab/tab-item";
import slideMenu from "../common/Menu";
import treeItem from "../read/menu-item";
import comment from "./comment";
import detailBig from "./detailBig";
export default {
  name: "book-detail",
  components: {
    book,
    Tab,
    TabItem,
    slideMenu,
    treeItem,
    comment,
    detailBig
  },
  data() {
    return {
      isCollect: false,
      bookDetail: {},
      bookId: this.$route.params.bookId,
      showMask: false,
      expanded: false,
      descHeight: 0,
      item: 0,
      chapter: [],
      comment: [],
      commentLength: 0,
      hotBooks: [],
      currentHotBooks: [],
      hotBooksIndex: 0
    };
  },
  async created() {
    this.bookDetail = await bookDetails({ bookId: this.bookId });
    this.$nextTick(() => {
      let itembox = this.$refs.itembox;
      let desc = this.$refs.desc;
      let itemboxHeight = itembox.getBoundingClientRect().height;
      this.descHeight = desc.getBoundingClientRect().height;
      if (this.descHeight > itemboxHeight) {
        this.showMask = true;
      }
    });
    if (this.$store.state.hotBooks.length) {
      this.hotBooks = this.$store.state.hotBooks;
    } else {
      let data = await indexBook({ type: [1], number: [12] });
      this.hotBooks = data.type1;
    }
    this.currentHotBooks = this.hotBooks.slice(0, 3);
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false;
    },
    account() {
      return this.$store.state.account;
    },
    expandHeight() {
      return this.expanded ? this.descHeight + "px" : "";
    }
  },
  methods: {
    expanddown() {
      this.expanded = !this.expanded;
    },
    expandup() {
      this.expanded = false;
    },
    async clickItem(index) {
      if (!this.chapter.length && index == 1) {
        this.chapter = await getMenu({ book_uid: this.bookId });
        this.$store.dispatch("setChapterMenu", this.chapter);
      }
      if (!this.comment.length && index == 2) {
        let data = await getComment({ book_uid: this.bookId });
        this.commentLength = data.datas.length;
        // this.comment = data.datas.slice(0, 2)
        this.comment = data.datas;
        this.$store.dispatch("setComment", this.comment);
      }
      this.item = index;
    },
    getChapter(id) {
      this.$router.push({
        name: "read",
        params: { bookId: this.bookId },
        query: { chapterId: id }
      });
    },
    moreMenu() {
      this.$router.push({
        name: "currentMenu",
        query: { bookId: this.bookId }
      });
    },
    read() {
      this.$router.push({ name: "read", params: { bookId: this.bookId } });
    },
    async buy() {
      let data = await createOrder({ bookId: this.bookId, type: 0 });
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx156797003156a1d1&redirect_uri=" +
          encodeURIComponent(
            location.origin +
              location.pathname +
              "#payDetail/" +
              this.bookId +
              "/" +
              data.orderid +
              "?redirect=" +
              this.$route.fullPath +
              "&location=" +
              location.href
          ) +
          "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
      } else {
        this.$router.push({
          name: "payDetail",
          params: { bookId: this.bookId, orderId: data.orderid },
          query: { redirect: this.$route.fullPath, location: location.href }
        });
      }
    },
    changeMore() {
      this.hotBooksIndex += 3;
      if (this.hotBooksIndex > this.hotBooks.length - 1) {
        this.hotBooksIndex = 0;
      }
      
      this.currentHotBooks = this.hotBooks.slice(
        this.hotBooksIndex,
        this.hotBooksIndex + 3
      );
    },
    async collect(collect) {
      if (collect) {
        await cancelCollectBook({ bookId: this.bookId });
        this.$vux.toast.show({
          text: "取消收藏",
          position: "bottom",
          width: "auto",
          type: "text"
        });
      } else {
        await collectBook({ bookId: this.bookId });
        this.$vux.toast.show({
          text: "收藏成功",
          position: "bottom",
          width: "auto",
          type: "text"
        });
      }
      this.bookDetail.isCollect = collect == 0 ? 1 : 0;
    },
    gopressInfo(){
      this.$router.push({name: 'pressInfo', params: {pressId: this.bookDetail.pressId},query: {title: this.bookDetail.pressName}})
    }
  }
};
</script>
<style lang="less">
@import "../../assets/styles/setArrow.less";
.ts-book-detail{
  .booktitle{
    width: auto;
  }
}
.detail-plus {
  margin-top: 0.33rem;
}

.detail-btn {
  width: 2.4rem;
  height: 0.77rem;
  line-height: 0.77rem;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ffbf01;
  vertical-align: middle;
  font-size: 0.3rem;
  &.buy {
    background: #ffbf01;
    margin-left: 0.18rem;
    margin-right: 0.2rem;
  }
  &.disable{
     background: #fff;
     color:rgba(0, 0, 0, 0.3);
     border-color: rgba(0, 0, 0, 0.2);
  }
}

.icon-divs {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font-size: 0.28rem;
  .icon-groups {
    display: inline-block;
    &:first-child {
      margin-right: 0.08rem;
    }
  }
  .zicon {
    font-size: 0.43rem;
    color: #bbb;
  }
}

.details-box {
  margin-top: 0.2rem;
  background: #fff;
  .menu {
    width: 100vw;
    height: 300px;
    border: 1px solid black;
    display: inline-block;
  }
  .items-box {
    max-height: 4.35rem;
    background: #fff;
    overflow: hidden;
    position: relative;
    // transition: max-height 0.3s; // .mask {
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     height: 2rem;
    //     -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    //     background: #fff;
    // }
  }
  .expand {
    background: #fff;
    text-align: center;
    .down-arrow {
      .setArrow(down, 0.22rem, #999, 1px);
      top: -5px;
      transition: all 0.3s;
      &.reverse {
        .setArrow(top, 0.22rem, #999, 1px);
      }
    } // .up-arrow {
    //     .setArrow(top, 0.22rem, #999, 1px);
    //     top: -5px;
    // }
  }
}

.ts-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2rem;
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );
  background: #fff;
}

.items-desc {
  padding: 0.3rem;
  text-indent: 2em; // font-size: 0.32rem;
}

.items-menu-box {
  background: #fff;
  padding: 0 0.3rem;
  text-align: center;
  position: relative;
  .ts-mask {
    bottom: 0.6rem;
  }
  .menu-item .item-name {
    padding: 0.2rem 0 0 0;
  }
  .menu-item {
    text-align: left;
    font-size: 0.3rem;
    padding-left: 0.3rem;
  }
}

.arrowright {
  .setArrow(right, 0.18rem, #b1b1b1, 1px); // margin-left:0.1rem;
} // max-height: 4.35rem;
.items-comment-box {
  background: #fff;
}

.ts-book-detail {
  .ts-container {
    padding-bottom: 0.8rem;
  }
  .more {
    padding: 0.2rem;
    color: #b1b1b1;
    font-size: 0.3rem;
  }
}

.nocomments {
  padding: 0.3rem;
  text-align: center;
}

.detail-box-title {
  padding: 0.23rem 0.27rem;
  .content {
    padding-left: 0.15rem;
    border-left: 4px solid #ffbf01;
    line-height: 1.3;
  }
  .right-word {
    padding-right: 0.1rem;
    color: #b1b1b1;
  }
}
.press-container {
  padding: 0.34rem 0rem;
}
.press-box {
  width: 4.2rem;
  height: 1.3rem;
  margin: 0 auto;
  background-position: center center;
  background-size: cover;
}
.hot-books-container {
  padding: 0.3rem 0.28rem;
  justify-content: space-between;
  .books-info {
    width: 2rem;
  }
  .books-info .book-cover {
    height: 2.8rem;
  }
  .books-info .title {
    width: 2rem;
  }
}
</style>
