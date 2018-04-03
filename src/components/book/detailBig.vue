<template>
    <div class="books-info" @click="detail(bookDetail.bookId)">
        <div class="book-cover back-center" v-lazy:background-image="bookDetail.bookCover + '@190w'">
            <div class="ribbonBox" v-if="rank">
                <ribbon width="0.5rem" v-if="index && index<=10" :text="index" :color="color"></ribbon>
            </div>
        </div>
        <p class="title">{{bookDetail.bookName}}</p>
        <p class="price red" v-if="bookDetail.discountPrice>0">￥{{bookDetail.discountPrice}}</p>
        <span v-else class="free">免费</span>
    </div>
</template>
<script>
import ribbon from './ribbon'
export default {
    name: 'detailBig',
    components: {
        ribbon
    },
    props: {
        bookDetail: Object,
        index: Number,
        rank: Boolean
    },
    computed: {
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
    methods: {
        detail(bookId){
            this.$router.push({name:'bookDetail', params:{bookId}})
        }
    }
}
</script>
<style lang="less">
@import '../../assets/styles/text.less';
.books-info {
    display: inline-block;
    vertical-align: top;
    padding-bottom: 0.2rem;
    width: 3.04rem;
    position: relative;
    .title {
        .ellipsis(3rem);
    }
    .book-cover {
        width: 100%;
        height: 4.32rem;
        background-color: rgba(0, 0, 0, 0.3);
    }
    .free {
        background-color: #ffbf01;
        color: #fff;
        padding: 0 4px;
        border-radius: 4px;
        font-size: 0.3rem;
    }
    .ribbonBox {
        position: absolute;
        top: -6px;
        left: 0.15rem;
    }
}
</style>