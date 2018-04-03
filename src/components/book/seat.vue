<template>
    <transition name="seat">
        <span class="seat-span" v-if="!text" :key="1" :style="styles"></span>
        <span :class="className" v-else :key="2">{{text}}</span>
    </transition>
</template>
<script>
export default {
    props: {
        text: {
            type: String
        },
        className: {
            type: String
        },
        styles: {
            type: Object
        }
    }
}
</script>
<style lang="less">
.seat-span {
    display: inline-block;
    width: 30%;
    height: 10px;
    background: rgba(0, 0, 0, 0.1);
}

.seat-enter,
.seat-leave-to {
    opacity: 0;
}

.seat-enter-active {
    transition: opacity 0.6s
}

// .seat-leave-active {
//     transition: opacity 2s
// }
</style>


