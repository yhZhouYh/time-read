<template>
    <div class="menu-icons">
        <icon icon="icon-liebiao" @click.native="small" :class="{active: mode ==1}"></icon>
        <icon icon="icon-bigmenu" @click.native="big" :class="{active: mode == 2}"></icon>
    </div>
</template>
<script>
export default {
    name: 'menu-icons',
    props: {
        mode: Number
    },
    methods: {
        small() {
            this.$emit('small')
        },
        big() {
            this.$emit('big')
        }
    }
}
</script>
<style lang="less">
.menu-icons {
    display: inline-block;
    .zicon {
        font-size: 0.45rem;
        color: #bbb;
        &:first-child {
            // margin-right: 0.18rem;
        }
        &.active{
            color: #ffbf01;
        }
    }
}
</style>
