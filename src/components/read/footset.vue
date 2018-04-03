<template>
    <transition name="fade-ups">
        <div class="foot-set" v-show="show">
            <div class="back-set zflex">
                <span>主题：</span>
                <div class="circle" v-touch-ripple v-for="(color,index) in circles" :key="index" :style="{backgroundColor: color}" :class="{active: checked == index}" @click="checkColor(color,index)">
                </div>
            </div>
            <div class="font-set zflex">
                <span>字号：</span>
                <div class="font-btn" v-touch-ripple @click="larger">A+</div>
                <div class="font-btn" v-touch-ripple @click="smaller">A-</div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'footset',
    props: {
      show: {
          type:Boolean,
          default: false
      }  
    },
    data() {
        return {
            circles: ['#f6e2c9', '#d0ead2', '#c7cede', '#ead4e4'],
            checked: 0,
        }
    },
    methods: {
        checkColor(color, index) {
            this.checked = index
            this.$emit('checkcolor', color)
        },
        larger() {
            this.$emit('larger')
        },
        smaller() {
            this.$emit('smaller')
        }
    }
}
</script>

<style lang="less">
.foot-set {
    width: 5.5rem;
    padding: 0.23rem 0.4rem 0.4rem;
    vertical-align: middle;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1.7rem;
    z-index: 100;
    margin: auto;
    background: rgba(0, 0, 0, 0.6);
    color: #ddd;
    border-radius: 10px;
}

.circle {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    margin: 0 0.15rem;
    &.active {
        border: 1px solid #ffbf01;
    }
}

.font-set {
    padding-top: 0.4rem
}

.font-btn {
    padding: 0.05rem 0.5rem;
    border: 0.01rem solid #ddd;
    margin: 0 0.2rem;
    border-radius: 15px;
}
.fade-ups-enter-active,.fade-ups-leave-active{
     transition: all .3s ease;
}
.fade-ups-enter,.fade-ups-leave-to{
    opacity:0;
    transform: translate3d(0,10px,0)
}
</style>
