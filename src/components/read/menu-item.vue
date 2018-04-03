<template>
    <li class="menu-item" :class="{ lock: !model.free}">
        <!-- <icon v-if="isFolder" icon="icon-zhankai"></icon> -->
        <a class="item-name zflex" @click.stop="getChapter(model.id)">
            <span class="tree-name zflex1">{{model.title}}</span>
            <icon icon="icon-suo" v-if="!model.free"></icon>
        </a>
        <ul class="tree" v-if="isFolder">
            <tree v-for="item in model.children" :model="item" :key="item.id" @getChapter="outChapter"></tree>
        </ul>
    </li>
</template>
<script>
import icon from '../common/Icon'
export default {
    name: 'tree',
    components: {
        icon
    },
    props: {
        model: {
            type: Object
        }
    },
    data() {
        return {
            // isFolder: false,
            open: false
        }
    },
    computed: {
        isFolder() {
            return this.model.children && this.model.children.length
        }
    },
    methods: {
        getChapter(id){
            this.$emit('getChapter', id)
        },
        outChapter(id){
            this.$emit('getChapter', id)
        }
    }
}
</script>
<style lang="less">
.menu-item {
    color: #333;
    font-size: 0.33rem;
    .tree-name {
        width: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
    }
    &.lock {
        color: #999;
    }
    .item-name {
        padding: 0.2rem 0;
        &:active {
            background-color: #ECECEC;
        }
    }
    .tree {
        .item-name {
            padding: 0.2rem 0 0.2rem 0.4rem;
            color: #666;
        }
    }
}

.menu-content {
    li {
        list-style: none;
    }
}
</style>


