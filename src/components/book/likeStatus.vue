<template>
    <span class="icon-zan" @click="upNum">
        <icon icon="icon-zan2" v-show="data.islike"></icon>
        <icon icon="icon-zan1" v-show="!data.islike" class="zan1"></icon>

        <span class="num">{{data.likeNum}}</span>
        <transition name="fade-up">
            <span class="num-up" v-show="!data.islike">+1</span>
        </transition>
    </span>
</template>
<script>
import { bookLike } from '../../api'

export default {
  name: 'like-status',
  props: {
    //    status: {
    //        type: Boolean,
    //        default: false
    //    },
    likeNum: {
      type: Number,
      default: 0
    },
    id: {
      type: Number
    },
    status: {
      type: Number
    },
    data: Object
  },
  data() {
    return {
      likestatus: this.status ? false : true,
      num: this.likeNum
    }
  },
  mounted() {
    console.log(this.likeNum, '22')
  },
  methods: {
    async upNum() {
      await bookLike({ comment_id: this.data.id })
      this.data.islike = !this.data.islike
      //  this.$emit('update:isExpand', !this.isExpand)
      if (!this.data.islike) {
        this.data.likeNum++
      } else {
        this.data.likeNum--
      }
    }
  }
}
</script>