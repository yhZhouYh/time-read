<template>
    <div class="home">
        <div class="carousel">
            <carousel :imgs="imgs" dotColor="#ffbf01" @itemClick="itemClick"></carousel>
        </div>
        <home-box :items="items1" title="热门推荐" type="1"></home-box>
        <home-box :items="items2" title="最新推荐" type="2"></home-box>
        <home-box :items="press" title="出版社" :book="false" type="press"></home-box>
        <home-box :items="items3" title="免限推荐" type="3"></home-box>
    </div>
</template>
<script>
import homeBox from './homeBox'
import { indexBook, indexPress } from '../../api'
import TsMenu from '../common/Menu'
import Carousel from '../common/Carousel'
export default {
    name: 'home',
    components: {
        Carousel,
        homeBox
    },
    data() {
        return {
            imgs: [
                require('../../assets/imgs/sample.jpg'),
                require('../../assets/imgs/sample.jpg')
            ],
            items: [
                { id: 1, title: '热门推荐' },
                { id: 2, title: '最新推荐' },
                { id: 3, title: '免限专区' },
            ],
            items1: [],
            items2: [],
            items3: [],
            press: [],
            content: [],
            loadingBoxHeight: 0,
            loading: false,
            moveBool: true,
            promise: {},
            scrollTop: 0
        }
    },
    async created() {
        let [books, press] = await Promise.all([indexBook({ type: [1, 2, 3], number: [12, 10, 10] }), indexPress({ type: 1, number: 10 })])
        this.press = press
        this.items1 = books.type1
        this.$store.dispatch('saveHotBooks', this.items1)
        this.items2 = books.type2
        this.items3 = books.type3
    },
    methods: {
        itemClick(i) {
            console.log(i)
        }
    }
}
</script>
<style lang="less">
.home {
    // height: 100%;
    // overflow-y:auto;
    // .carousel {
    //     height: 2.68rem;
    //     // margin-top:44px;
    // }
    .vux-tab {
        height: 0.8rem;
        .vux-tab-item {
            line-height: 0.8rem;
        }
    }
}
</style>

