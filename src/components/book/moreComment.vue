<template>
    <div class="ts-index more-comment">
        <z-header bckColor="#3d3c3e">
            <span slot="middle">更多评论</span>
            <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container" ref="container">
            <scroller-container @scrollFunc="scrollFunc" ref="scroller" container="ts-container">
                <comment :datas="comment"></comment>
            </scroller-container>
        </div>
    </div>
</template>
<script>
import ScrollerContainer from '../common/ScrollerContainer'
import Comment from './comment'
import { getComment } from '../../api'
export default {
    name: 'moreComment',
    components: {
        ScrollerContainer,
        Comment
    },
    data() {
        return {
            ps: 10,
            pn: 1,
            total: 0,
            comment: [],
            bookId: this.$route.params.bookId
        }
    },
    async created() {
        let data = await getComment({ "book_uid": this.bookId })
        this.comment = data.datas
        this.total = data.totalPage
        if (this.pn >= this.total) {
            this.$refs.scroller.destroy()
        }
    },
    methods: {
        async scrollFunc() {
            if (this.pn < this.total) {
                let data = await getComment({ book_uid: this.bookId, pageNumber: ++this.pn, pageSize: this.ps })
                this.comment = this.comment.concat(data.datas)
            } else {
                this.$refs.scroller.destroy()
            }
        },
    }

}
</script>
<style lang="less">
    .more-comment{
        .ts-container{
            padding-bottom: 0.8rem;
            background: #fff;
        }
    }
</style>
