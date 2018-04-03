<template>
    <div class="foot-bar zflex">
        <div class="zflex1" v-touch-ripple v-for="(item, key) in bars" :key="item.type" @click="getmenu(item,key)" :class="{active:item.active}">
            <icon :icon="item.icon"></icon>
            <p>{{item.name}}</p>
        </div>
        <!-- <div class="zflex1" v-touch-ripple @click="getmoon">
                                    <icon icon="icon-yejian"></icon>
                                    <p>夜间</p>
                                </div>
                                <div class="zflex1" v-touch-ripple @click="getset">
                                    <icon icon="icon-shezhi1"></icon>
                                    <p>设置</p>
                                </div>
                                <div class="zflex1" v-touch-ripple>
                                    <icon icon="icon-shuqian"></icon>
                                    <p>书签</p>
                                </div>
                                <div class="zflex1" v-touch-ripple>
                                    <icon icon="icon-biji01"></icon>
                                    <p>笔记</p>
                                </div> -->
    </div>
</template>
<script>
import Icon from '../common/Icon.vue'
export default {
    name: 'footbar',
    components: {
        Icon
    },
    props: {
        currentMenu: {
            type: Object
        }
    },
    data() {
        return {
            bars: this.$store.state.footData,
            current: {},
            active: false
        }
    },
    methods: {
        getmenu(item, key) {
            this.$store.dispatch('cancelFoot', key)
            item.active = !item.active
            this.current = item
            this.$store.dispatch('changeFoot', this.bars)
        },

    }
}
</script>
<style lang="less">
.foot-bar {
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    line-height: 1.8;
    color: #ddd;
    font-size: 0.3rem;
    .zicon {
        font-size: 0.55rem;
        color: #999;
    }
    .zflex1 {
        padding: 0.18rem 0;
        &.active {
            color: #ffbf01;
            .zicon {
                color: #ffbf01;
            }
        }
    }
}
</style>
