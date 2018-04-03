<template>
    <div class="ts-index current-menu">
        <z-header bckColor="#3d3c3e">
            <span slot="middle">目录详情</span>
            <home-icon slot="right"></home-icon>
        </z-header>
        <div class="ts-container">
            <ul class="menu-content">
                <tree-item :model="item" v-for="(item, index) in chapter" :key="item.id" @getChapter="getChapter"></tree-item>
            </ul>
        </div>
    </div>
</template>
<script>
import treeItem from '../read/menu-item'
export default {
    name: 'current-menu',
    components: {
        treeItem
    },
    computed: {
        chapter() {
            return this.$store.state.chapterMenu
        }
    },
    methods: {
        getChapter(id) {
            this.$router.push({ name: 'read', params: { bookId: this.$route.query.bookId }, query: { chapterId: id } })
        }
    }
}
</script>
<style lang="less">
.current-menu {
    .ts-container {
        background: #fff;
    }
    .menu-content {
        padding: 0.3rem;
    }
}
</style>