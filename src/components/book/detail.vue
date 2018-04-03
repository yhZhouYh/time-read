<template>
    <div class="ts-box" @click="detail(bookDetail.bookId)">
        <div class="zflex">
            <div class="book-cover back-center" v-lazy:background-image="bookDetail.bookCover + '@190w'">
                <!-- <div class="cover-rank back-center" :style="backNum" v-if="index && index<=10">
                    <span>{{index}}</span>
                </div> -->
                <!-- <div class="ribbonBox" v-if="rank">
                    <ribbon width="0.5rem" v-if="index && index<=10" :text="index" :color="color"></ribbon>
                </div> -->

            </div>
            <div class="book-info zflex1">
                <p class="title">
                    <seat :text="bookDetail.bookName" :styles="{height: '15px',width:'50%'}" className="booktitle"></seat>
                    <div class="readBtn" v-if="showbtn" @click.stop="startRead(bookDetail.bookId)">立即阅读></div>
                </p>
                <p class="comment" v-if="showComment">
                    <span>{{bookDetail.commentNum}}人评论</span> |
                    <span>{{bookDetail.readNum}}人在读</span>
                </p>
                <p class="author">
                    <span class="word word6">作者：</span>
                    <seat :text="bookDetail.author"></seat>
                </p>
                <p class="publish">
                    <span class="word word6">出版社：</span>
                    <seat :text="bookDetail.pressName"></seat>
                </p>
                <p class="publish-time">
                    <span class="word word6">出版：</span>
                    <seat :text="time"></seat>
                    <!-- <span v-seat:small>{{bookDetail.createTime | dateFormat("yyyy-MM-dd")}}</span> -->
                </p>
                <p class="book-desc word6" v-if="showDesc">
                    <seat :text="ookDetail.description"></seat>
                </p>
                <p v-if="bookDetail.discountPrice != bookDetail.ebookPrice">
                    <span class="nowPrice red">￥{{bookDetail.discountPrice}}</span>
                    <span class="word6">原价：</span>
                    <span class="origin-price">￥{{bookDetail.ebookPrice}}</span>
                </p>
                <p v-else>
                    <span class="word word6">售价：</span>
                    <seat :text="'￥'+bookDetail.ebookPrice"></seat>
                </p>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<script>
import dateFormat from '../filters/timeFormat'
import seat from './seat'
import ribbon from './ribbon'
export default {
    name: 'book-detail',
    components: {
        seat,
        ribbon
    },
    props: {
        bookDetail: {
            type: Object
        },
        showDesc: {
            type: Boolean,
            default: false
        },
        showbtn: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number
        },
        rank: {
            type: Boolean
        },
        showComment: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        startRead(bookId){
            this.$router.push({name:'read', params:{bookId}})
        },
        detail(bookId){
            this.$emit('godetail', bookId)
        }
    },
    computed: {
        time() {
            if (this.bookDetail.createTime) {
                return dateFormat(this.bookDetail.createTime, "yyyy-MM-dd")
            }
        },
        color() {
            let color = ''
            switch (this.index) {
                case 1:
                    color = '#ffbf01'
                    break;
                case 2:
                    color = '#fea3d0'
                    break;
                case 3:
                    color = '#a0b1fd'
                    break;
                default:
                    color = '#aaaaaa'
            }
            return color
        }
    },
    filters: {
        dateFormat
    },
    directives: {
        seat: {
            bind(el, binding, vnode) {
                el.classList.add('seat')
                el.classList.add('active')
                if (binding.arg) {
                    el.classList.add(binding.arg)
                }
            },
            update(el, binding, vnode, oldnode) {
                el.classList.add('loaded')
                if (binding.arg) {
                    el.classList.remove(binding.arg)
                }
            }
        }
    }
}
</script>
<style lang="less">
@import '../../assets/styles/text.less';
.ts-box {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0.32rem 0.4rem;
    position: relative;
    &:first-child {
        margin-top: 0;
    }
    .book-cover {
        width: 1.9rem;
        height: 2.68rem;
        position: relative;
        .cover-rank {
            position: absolute;
            width: 0.53rem;
            height: 0.54rem;
            top: -0.04rem;
            left: 0.1rem;
            padding-right: 0.05rem;
            padding-top: 0.05rem;
            text-align: center;
            color: #fff;
            font-size: 0.28rem;
        }
    }
    .book-info {
        font-size: 0.28rem;
        padding-left: 0.42rem;
        line-height: 1.7;
        .word {
            // width: 1.2rem;
            display: inline-block;
        }
        .comment {
            color: #999;
            font-size: 0.27rem;
        }
        .origin-price {
            text-decoration: line-through;
        }
        .nowPrice {
            font-size: 0.35rem;
            margin-right: 0.1rem;
        }
        .book-desc {
            line-height: 1.3;
            .ellipsisLn(2);
        }
        span {
            line-height: 1.3;
        }
        .booktitle {
            // display: inline-block;
            width: 2.5rem;
        }
    }
    .title {
        font-size: 0.32rem;
    }
    .seat {
        border-radius: 2px;
        display: inline-block;
        height: 10px;
        opacity: 1;
        transition: all 0.3s; // visibility: hidden;
        // vertical-align: middle;
        background: rgba(0, 0, 0, 0.3);
        color: transparent;
        &.loaded {
            visibility: hidden;
            height: 0;
            opacity: 0;
        }
        &.small {
            width: 30%;
        }
        &.middel {
            width: 60%;
        }
        &.big {
            width: 100%;
        }
    }
    .readBtn {
        position: absolute;
        top: 0.35rem;
        right: 0;
        padding: 0.15rem 0.15rem 0.15rem 0.3rem;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #ffbf01; // width: 1.8rem;
        font-size: 0.28rem;
    }
    .ribbonBox {
        position: absolute;
        top: -6px;
        left: 0.15rem;
    }
}
</style>
