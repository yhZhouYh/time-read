<template>
    <div class="ts-index-box">
        <div class="box-title">
            <span>{{title}}</span>
            <span class="more" @click="more" v-show="showMore">
                <span>更多</span>
                <span class="right-arrow"></span>
            </span>
            <!-- <span class="right-arrow"></span> -->
        </div>
        <!-- <ts-menu ref="menu" :vertical="false"> -->
        <div v-if="items.length">    
        <div class="ts-info-box" v-if="book">
            <div class="book-info" v-for="(item, index) in items" :key="index" ref="bookInfo" @click="detail(item.bookId)">
                <div class="book-cover back-center" v-lazy:background-image="item.bookCover + '@174w'"></div>
                <!-- <x-img :src="item.bookCover + '@174w'"></x-img> -->
                <!-- <lazy-img class="book-cover back-center" :dataSrc="item.bookCover + '@174w'" :img="false"></lazy-img> -->
                <!-- <div class="book-cover back-center" :style="{backgroundImage:'url('+item.bookCover+'@174w)'}" :data-src="item.bookCover"></div> -->
                <p class="title">{{item.bookName}}</p>
                <p class="price red" v-if="item.discountPrice>0">￥{{item.discountPrice}}</p>
                <span v-else class="free">免费</span>
            </div>
        </div>
        <div class="ts-info-box press" v-else>

            <div class="press-info tf-1px" v-for="(item, index) in items" :key="index" v-if="item.logo">
                <div class="back-center" v-lazy:background-image="item.logo + '@257w'"></div>
            </div>
        </div>
        </div>
        <div v-else style="text-align:center">
            暂无相关信息
        </div>
        <!-- </ts-menu> -->
    </div>
</template>
<script>
import TsMenu from '../common/Menu'
import LazyImg from '../common/LazyImg'
import Carousel from '../common/Carousel'
export default {
    name: 'tf-index-box',
    components: {
        TsMenu,
        LazyImg,
        Carousel
    },
    props: {
        items: {
            type: Array,
            default: () => {
                return []
            }
        },
        title: {
            type: String
        },
        book: {
            type: Boolean,
            default: true
        },
        type: {
            type: String
        },
        showMore: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        more() {
            if(this.type=='press'){
                 this.$router.push({ name: 'press'})
                 return
            }
            this.$router.push({ name: 'bookshelf', query: { rank: 1, type: this.type, title: this.title} })
        },
        detail(bookId){
            this.$router.push({name:'bookDetail', params:{bookId}})
        }
    },

}
</script>
<style lang="less">
@import '../../assets/styles/text.less';
@import '../../assets/styles/setArrow.less';
.ts-index-box {
    padding: 0.35rem 0.3rem;
    background: #fff;
    margin-top: 0.2rem;
    overflow: hidden; // white-space: nowrap;
    .ts-info-box {
        white-space: nowrap;
        overflow: auto;
    }
    .box-title {
        font-size: 0.36rem;
        position: relative;
        text-align: center;
        padding-bottom: 0.17rem;
        margin-bottom: 0.28rem;
        .more {
            font-size: 0.3rem;
            color: #999;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 0;
        }
        .right-arrow {
            vertical-align: middle;
            .setArrow(right, 0.19rem, #999, 1px);
            top: -2px;
        }
        &:before {
            content: "";
            width: 0.54rem;
            height: 2px;
            margin: 0 auto;
            background: #ffbf01;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    .book-info {
        display: inline-block;
        margin-right: 0.44rem;
        &:last-child {
            margin-right: 0
        }
        .title {
            .ellipsis(1.74rem);
        }
        .book-cover {
            height: 2.4rem;
            background-color: rgba(0, 0, 0, 0.3);
        }
        .free {
            background-color: #ffbf01;
            color: #fff;
            padding: 0 4px;
            border-radius: 4px;
            font-size: 0.3rem;
        }
    }
    .press-info {
        display: inline-block;
        margin-right: 0.24rem;
        width: 2.57rem;
        height: 1.87rem;
        line-height: 1.87rem;
        text-align: center;
        vertical-align: middle;
        overflow: hidden;
        padding: 0.1rem;
        &:last-child {
            margin-right: 0
        }
        img {
            width: 100%;
        }
    }
}
</style>
