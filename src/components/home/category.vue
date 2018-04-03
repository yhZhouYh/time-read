<template>
    <div class="ts-category">
           <div class="cate-box">
            <div class="cate-parent">全部</div>
                 <div class="cate-kids" v-touch-ripple @click="all">
                全部图书
            </div>
        </div>
        <div class="cate-box" v-for="(parent,index) in categorys" :key="index" v-if="parent.subCategoryDtos.length">
            <div class="cate-parent">{{parent.name}}</div>
                 <div class="cate-kids" v-touch-ripple v-for="(kid,index) in parent.subCategoryDtos" :key="index" @click="kidgo(kid)">
                {{kid.name}}
            </div>
        </div>
    </div>
</template>
<script>
import { getCategoryInfo } from '../../api'
export default {
    name: 'category',
    data() {
        return {
            categorys: []
        }
    },
    async created() {
        this.categorys = await getCategoryInfo()
    },
    methods:{
        kidgo(item){
            this.$router.push({name: 'bookshelf', query:{category:1,categoryId: item.uid, title: item.name}})
        },
        all(){
            this.$router.push({name: 'bookshelf', query:{category:1,categoryId: 0, title: '全部图书'}})
        }
    }
}
</script>
<style lang="less" scoped>
.ts-category {
    background: #fff; // height:100%;
    padding: 0.4rem 0.3rem;
    // flex:1;
}
.ts-container{
    background:#fff;
}

.cate-box {
    padding-bottom: 0.22rem;
    .cate-parent {
        padding-left: 0.2rem;
        border-left: 4px solid #ffbf01;
        line-height: 1.2;
        margin-bottom: 0.2rem; // line-height:0;
    }
    .cate-kids {
        display: inline-block;
        padding: 0.15rem 0.25rem;
        background: #fffaeb;
        margin-right: 0.3rem;
        margin-bottom: 0.23rem;
    }
}
</style>
