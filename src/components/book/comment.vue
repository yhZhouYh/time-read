<template>
    <div class="comment">
        <div v-for="(data, index) in datas" class="ts-comment zflex ts-1px-t" :key="index" v-if="showItems(index)">
            <img :src="data.creator.avatar" class="avatar">
            <div class="comment-info zflex1">
                <p>
                    <span class="comment-user">{{data.creator.name}}</span>
                </p>
                <p class="comment-conetnet">{{data.content}}</p>
                <div class="comment-reply-box" v-if="data.replyTotal">
                    <p class="replys" v-for="(item, index) in data.replys" :key="index" v-if="index < 3 && data.replys.length" @click="reply(item, data)">
                        <span class="reply-name">{{item.creator.name}}:</span>
                        <span class="reply-content">{{item.content}}</span>
                    </p>
                    <p class="more-reply" @click="expandComment(data)" v-if="data.replyTotal - 3 > 0">
                        更多{{data.replyTotal - 3}}条回复
                    </p>
                    <!-- <span class="time">2017-06-02 12:35</span> -->
                </div>
                <p class="comment-foot zflex">
                    <span class="time zflex1">{{data.createTime | dateFormat("yyyy-MM-dd hh:mm:ss")}}</span>
                    <span class="comment-icons">
                        <like-status :data="data"></like-status>
                        <span @click="reply(data, data)" class="comment-icon">
                            <icon icon="icon-pinglun"></icon>
                            <span class="num">{{data.replyTotal}}</span>
                        </span>
                        <icon icon="icon-shanchu" @click.native="deleteComment(data.id, index)" v-if="data.creator.uid == $store.state.account.uid"></icon>
                    </span>
                </p>
            </div>
        </div>
        <div v-if="datas.length>2 && showMore" style="text-align:center" class="more" @click="moreComment">加载更多</div>
        <div class="comment-input zflex" v-show="isLogin">
            <div class="zflex1">
                <div class="replay-to" v-if="replyTo">回复 {{replyTo.creator.name}} :</div>
                <div class="edit zflex1" contenteditable="true" placeholder="说说你的想法" ref="input" @input="inputContent"></div>
            </div>
            <span class="submit" :class="{active: hasContent}" @click="submit">发表</span>
        </div>
        <navbar mode="foot" direction="bottom" mask :isExpand.sync="isExpandComment">
            <div class="nav-reply" v-if="currentData">
                <div v-if="currentData.replys.length">
                    <p class="replys" v-for="(item, index) in currentData.replys" :key="index" @click="reply(item, currentData)">
                        <span class="reply-name" v-if="currentData.id == item.parentId">{{item.creator.name}}:</span>
                        <span v-else>
                            <span class="reply-name">{{item.creator.name}}</span> 回复
                            <span class="reply-name">{{item.replyUser.replyName}}:</span>
                        </span>
                        <span class="reply-content">{{item.content}}</span>
                        <span class="time">{{item.createTime | dateFormat("yyyy-MM-dd hh:mm:ss")}}</span>
                        <span class="reply-name" @click="deleteComment(item.id, index)" style="padding-left:0.2rem" v-if="item.creator.uid == $store.state.account.uid">删除</span>
                    </p>
                </div>
                <div v-else style="text-align:center">暂无回复</div>
            </div>
        </navbar>
    </div>
</template>
<script>
import XInput from 'vux/src/components/x-input'
import Navbar from '../common/Navbar'
import dateFormat from '../filters/timeFormat'
import likeStatus from './likeStatus'
import { bookComment, deleteBookComment, bookLike } from '../../api'
export default {
  name: 'comment',
  components: {
    XInput,
    Navbar,
    likeStatus
  },
  props: {
    datas: {
      type: Array
    },
    bookId: String,
    length: Number,
    showMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // numUp: false,
      // likenum: this.data.likeNum,
      input: null,
      hasContent: false,
      replyTo: '',
      isExpandComment: false,
      currentData: null,
      content: '',
      parent: ''
    }
  },
  filters: {
    dateFormat(time, fmt) {
      return dateFormat(time, fmt)
    }
  },
  mounted() {
    this.input = this.$refs.input
  },
  computed: {
    isLogin() {
      return this.$store.state.account.uid ? true : false
    }
  },
  watch: {
    isExpandComment() {
      if (!this.isExpandComment) {
        this.input.innerHTML = ''
        this.replyTo = ''
        this.currentData = ''
      }
    }
  },
  methods: {
    showItems(index) {
      if (this.showMore) {
        return index < 2
      } else {
        return true
      }
    },

    comment() {
      this.input.focus()
    },
    inputContent(e) {
      if (this.input.innerHTML) {
        this.hasContent = true
      } else {
        this.hasContent = false
      }
    },
    reply(item, parent) {
      if (!this.isLogin) {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath }
        })
        return
      }

      this.replyTo = item
      this.parent = parent
      this.input.focus()
      this.isExpandComment = true
      this.currentData = parent
      // this.input.scrollIntoViewIfNeeded() IOS是个坑
      // this.content = '回复 ' + item.creator.name + ':'
      // this.input.innerHTML = this.content
      // this.setFocus(this.input)
    },
    getRange() {
      var userSelection, rangeObject
      if (window.getSelection) {
        //现代浏览器
        userSelection = window.getSelection()
      } else if (document.selection) {
        //IE浏览器 考虑到Opera，应该放在后面
        userSelection = document.selection.createRange()
      }

      //Range对象
      rangeObject = userSelection
      if (userSelection.getRangeAt) {
        //现代浏览器
        rangeObject = userSelection.getRangeAt(0)
      }
      return userSelection
    },
    expandComment(data) {
      this.isExpandComment = true
      this.currentData = data
    },
    setFocus(ele) {
      var txt = this.getRange()
      txt.collapse(ele, 1)
    },
    moreComment() {
      this.$router.push({
        name: 'moreComment',
        params: { bookId: this.bookId }
      })
    },
    async submit() {
      console.log(this.currentData)
      if (this.hasContent) {
        let data = await bookComment({
          book_uid: this.bookId,
          content: this.input.innerHTML,
          first_parent_id: this.parent.id,
          replyId: this.replyTo ? this.replyTo.id : 0,
          h5: 1
        })
        this.$vux.toast.show({
          text: '评论成功',
          position: 'bottom',
          width: 'auto',
          type: 'text'
        })
        if (this.replyTo) {
          this.currentData.replys.push(data)
          this.currentData.replyTotal += 1
        } else {
          console.log(data)
          data.replys = [] //构造空数组
          this.datas.unshift(data)
          console.log(this.datas)
        }
        this.replyTo = '' //重置
        this.input.innerHTML = ''
        this.hasContent = false
        // this.currentData = ''
      }
    },
    async deleteComment(id, index) {
      await deleteBookComment({ comment_id: id })
      this.$vux.toast.show({
        text: '删除成功',
        position: 'bottom',
        width: 'auto',
        type: 'text'
      })
      if (this.replyTo) {
        this.currentData.replys.splice(index, 1)
      } else {
        this.datas.splice(index, 1)
      }
    }
  }
}
</script>   
<style lang="less">
.ts-comment {
  padding: 0.3rem;
  font-size: 0.3rem;
  .time {
    color: #b1b1b1;
    font-size: 0.28rem;
  }
  .zheader-icon {
    font-size: 0.4rem;
  }
  &.zflex {
    align-items: flex-start;
  }
  .comment-conetnet {
    line-height: 1.2;
    padding: 4px 0 8px 0;
    font-size: 0.29rem;
  }
  .avatar {
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.05rem;
  } // .comment-user{
  //     font-size:.3rem;
  // }
  .comment-foot {
    color: #b1b1b1; // padding-top: 0.2rem;
  }
  .comment-info {
    padding-left: 0.2rem;
  }
  .comment-icons {
    .num {
      vertical-align: middle; // margin-left: 1px;
      font-size: 0.27rem;
    }
    .icon-zan {
      margin-right: 0.15rem;
      position: relative;
    }
    .num-up {
      position: absolute;
      top: -3px;
      left: 2px;
      font-size: 0.24rem;
      opacity: 0;
      color: #ffbf01;
    }
    .zan1 {
      color: #ffbf01;
    }
  }
}

.comment-reply-box {
  background: #f3f3f5;
  padding: 0.2rem;
  font-size: 0.28rem;
}

.reply-content {
  padding-left: 0.1rem;
}

.reply-name {
  color: #3478f7;
}

.more-reply {
  color: #3478f7;
}

.replay-to {
  // padding:0.2rem 0.15rem 0;
}

.fade-up-enter-active {
  //   transition: all .3s ease;
  animation: fadeOut-up 0.8s;
}

@keyframes fadeOut-up {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: translate3d(0, -15px, 0);
    transform: translate3d(0, -15px, 0);
  }
}

.comment-input {
  position: fixed;
  bottom: 0; // left: 0;
  // right: 0;
  width: 100%;
  background: #fff;
  z-index: 7000;
  min-height: 0.8rem;
  padding: 0.2rem 0.2rem;
  border-top: 1px solid #c7c7c7;
  .submit {
    // padding-right: 0.3rem;
    color: #b1b1b1;
    font-size: 0.25rem;
    &.active {
      color: #3478f7;
    }
  }
  .edit {
    max-height: 1.5rem;
    overflow: auto;
    word-break: break-all; // padding: 0.15rem 0.2rem 0.15rem 0.1rem;
    -webkit-user-modify: read-write-plaintext-only; //只能输入纯文本
    outline: none; // -webkit-user-select: text;
    min-height: 0.5rem;
    &:empty:before {
      color: lightgrey;
      content: attr(placeholder);
    }
  }
}

.nav-reply {
  height: 100%;
  background: #fff;
  padding: 0.2rem 0.3rem 1.5rem;
  overflow: auto;
  font-size: 0.28rem;
  .time {
    padding-left: 0.2rem;
    color: #b1b1b1;
    font-size: 0.28rem;
  }
}

.comment {
  .navbar {
    .foot {
      height: 85%;
    }
  }
  .more {
    padding-top: 0;
  }
}
.comment-icon {
  margin-right: 0.15rem;
}
</style>
