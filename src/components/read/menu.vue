<template>
    <div class="read-menu">
        <div class="menu-head">
            <span class="head-content zflex">
                <span class="verti"></span>
                <span class="menu-name">目录</span>
                <span class="menu-info">共{{model.length}}章</span>
            </span>
        </div>
        <ul class="menu-content">
            <tree-item :model="item" v-for="item in model" :key="item.id" @getChapter="getChapter"></tree-item>
        </ul>
    </div>
</template>
<script>
import treeItem from './menu-item'
// import { getMenu } from '../../api'
export default {
    name: 'menu',
    components: {
        treeItem
    },
    props: {
        model:{
            type: Array,
            default: []
        }
    },
    methods: {
        getChapter(id){
            this.$emit('getChapter', id)
        }
    }
}
</script>
<style lang="less">
.read-menu {
    width: 6.5rem;
    height: 100%;
    background: #fff;
    font-size: 18px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.menu-head {
    padding: 0.25rem;
}

.head-content {
    // border-left:0.07rem solid #ffbf01;
    // padding-left:0.2rem;
    .verti {
        width: 0.09rem;
        height: 0.35rem;
        background: #ffbf01;
        margin-right: 0.2rem;
    }

    .menu-name {
        font-size: 0.4rem;
        font-weight: 700;
    }
    .menu-info {
        font-size: 0.28rem;
        color: #ccc;
        padding-left: 0.2rem;
    }
}

.menu-content {
    padding: 0 0.4rem 0.4rem;
}
</style>

