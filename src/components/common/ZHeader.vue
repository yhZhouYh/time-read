<template>
    <div class="z-header zflex" :style="{background:bckColor}">
        <span class="z-header-left zflex zflex1">
                    <div class="z-arrow zflex" :style="{color: arrowColor}" @click="goback(url)" v-if="showArrow">
                        <span class="arrow-icon"></span>
                        <!-- <icon icon="icon-back"></icon> -->
                        <!--<svg class="zicon zheader-icon" aria-hidden="true" v-show="showArrow">
                            <use xlink:href="#icon-icon-back"></use>
                        </svg>-->
                         <span class="leftwords" v-show="showBack">{{backWords}}</span>
    </div>
    <slot name="left"></slot>
    </span>
    <span class="z-header-middle" :style="{color:titleColor}">{{title}}
        <slot name="middle" v-if="!title"></slot>
    </span>
    <span class="z-header-right zflex zflex1">
            <slot name="right"></slot>
        </span>
    </div>
</template>

<style lang="less">
@import '../../assets/styles/setArrow.less';
.setTapColor(@c: rgba(0, 0, 0, 0)) {
    -webkit-tap-highlight-color: @c;
}
.arrow-icon{
    .setArrow(left, 14px, #fff, 3px)
}
.z-arrow {
    height: 0.5rem;
    .setTapColor();
    .leftwords {
        font-size: 15px;
        color: #ccc;
    }
}

.z-header {
    font-size: 19px;
    height: 0.85rem;
    text-align: center;
    padding: 0.08rem 0.3rem;
    box-sizing: border-box;
    //background: rgba(0, 0, 0, 0);
    background: #fff;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 100;
    left:0;
    transition: all ease 0.3s;
    .zicon{
        color:#fff;
    }
}

.z-header-left {
    // text-align: left;
    position: relative;
}

.z-header-right{
    // text-align: right;
    justify-content: flex-end;
    .zicon{
        margin-right: 0.15rem;
        &:last-child{
            margin-right:0;
        }
    }
}
.zheader-icon {
    font-size: 0.45rem;
}

// .z-header-middle {
//     width: 3.8rem;
// }

.zheader-icon-word {
    font-size: 12px;
}
</style>
<script>
import Icon from '../common/Icon'
export default {
    name: 'z-header',
    components: {
        Icon
    },
    props: {
        showBorder: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            // default: '主页'
        },
        showBack: {
            type: Boolean,
            default: false
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        titleColor:{
            type: String,
            default: '#fff'
        },
        bckColor: {
            type: String,
            default: '#fff'
        },
        arrowColor: {
            type: String,
            default: '#e74037'
        },
        backWords: {
            type: String,
            default: '返回'
        },
        url: {
            type: String
        }
    },
    methods: {
        goback (url) {
          if(this.$route && url){
            this.$router.push(url)
          }else if(this.$route &&　!url){
              this.$router.go(-1)
          }else if(!this.$route && url){
              location.href='#/' + url
          }else{
              historu.go(-1)
          }
          this.$emit('goback')
        }
    }

}
</script>