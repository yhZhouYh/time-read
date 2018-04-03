<template>
    <div>
        <div id="aliPayForm" ref="alipayform"></div>
        <img src="../../assets/imgs/aliPay.jpg" class="aliImg">
        <div class="ali-mask" v-show="isWechat" @click="closeMask">
            <img src="../../assets/imgs/shareArrow.png" alt="">
            <p>请在浏览器中打开</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'payAli',
    data() {
        return {
            isWechat: this.isWeiXin()
        }
    },

    mounted() {
        let form = this.$refs.alipayform
        form.innerHTML = this.$route.query.form
        if (!this.isWechat) {
            document.forms['punchout_form'].submit();
        }
    },
    methods: {
        isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>
<style lang="less">
.aliImg {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 3rem;
    width: 2rem;
}
</style>

