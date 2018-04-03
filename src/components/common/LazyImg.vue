<template>
    <div class="b-lazy" v-if="!img" :data-src="dataSrc">
    </div>
    <img class="b-lazy" v-else :data-src="dataSrc" :src="defaultImg">
</template>
<script>
import Blazy from '../../assets/lib/blazy'
export default {
    name: 'lazy-img',
    props: {
        img: {
            type: Boolean,
            default: true
        },
        defaultImg: {
            type: String
        },
        dataSrc: {
            type: String
        }
    },
    mounted() {
        this.$nextTick(() => {

            var a = new Blazy({
                // container: '.ts-scroller-box',
                validateDelay: '500'
            })
        })
    }
}
</script>
<style>

</style>
