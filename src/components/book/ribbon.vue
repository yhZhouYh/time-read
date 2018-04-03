<template>
    <div class="ribbon" :style="body">
        <div class="smalltri" :style="smalltri"></div>
        <div class="triangle" :style="triangle"></div>
        <span>{{text}}</span>
    </div>
</template>
<script>
export default {
    name: 'ribbon',
    props: {
        text: Number,
        width: {
            type: String,
            default: '60px'
        },
        color: {
            type: String,
            default: '#F47530'
        }
    },
    computed: {
        body() {
            return { width: this.width, background: this.color }
        },
        triangle() {
            var num = parseFloat(this.width)
            if (isNaN(num)) {
                console.warn('请传正确的width')
            } else {
                let width = num / 2
                let unit = this.width.replace(num, '')
                return {
                    borderLeft: width + unit + ' solid ' + this.color,
                    borderRight: width + unit + ' solid ' + this.color,
                    // borderBottom: width + unit + ' solid transparent',
                    // bottom: -width + unit
                }
            }
        },
        smalltri(){
            return {
                borderBottom: '6px solid '+ this.color
            }
        }
    }

}
</script>
<style lang="less">
.ribbon {
    display: inline-block; // width: 60px;
    // padding: 10px 0;
    background: #F47530; // top: -6px;
    // left: 25px;
    position: absolute;
    text-align: center;
    border-top-left-radius: 3px;
    color:#fff;
    z-index:10;
    .triangle {
        position: absolute;
        height: 0;
        width: 0; // border-left: 30px solid #F47530;
        // border-right: 30px solid #F47530;
        border-bottom: 5px solid transparent;
        bottom: -5px;
        left: 0;
    }
}

.ribbon:before,
.ribbon:after {
    content: "";
    position: absolute;
}

.smalltri{
    height: 0;
    width: 0;
    border-bottom: 3px solid #8D5A20;
    border-right: 3px solid transparent;
    right: -3px;
    top: 0;
    position: absolute;
    z-index: 2
}

// .ribbon:after {
//     height: 0;
//     width: 0;
//     border-left: 30px solid #F47530;
//     border-right: 30px solid #F47530;
//     border-bottom: 30px solid transparent;
//     bottom: -30px;
//     left: 0;
// }
</style>
