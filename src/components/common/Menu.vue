<template>
    <div class="ts-scroller-box" :class="{vertical}" ref="box">
        <div class="ts-scroller" :class="{vertical}" ref="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Transform from '../../assets/lib/transform'
import AlloyTouch from '../../assets/lib/alloy_touch'
export default {
    props: {
        vertical: {
            type: Boolean,
            default: true
        },
        css: {
            type: Boolean,
            default: false
        },
        threshold: {
            type: Number,
            default: 0
        },
        slider: {
            type: Boolean,
            default: false
        },
        preventDefault: {
            type: Boolean,
            default: true
        },
        step: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            touch: null,
            // step: 0,
            currentPage: 1,
            disX: 0
        }
    },
    beforeDestroy() {
        if (this.touch != null) {
            this.touch.destroy()
        }
        this.touch = null
    },
    methods: {
        init() {
            let scroller = this.$refs.scroller
            let box = this.$refs.box
            let scrollerScope = this.vertical ? scroller.getBoundingClientRect().height : scroller.getBoundingClientRect().width
            let boxScope = this.vertical ? box.getBoundingClientRect().height : box.getBoundingClientRect().width
            let _this = this
            let startPos = 0
            const options = {
                target: scroller,
                touch: box,
                vertical: _this.vertical,
                property: _this.vertical ? 'translateY' : 'translateX',
                min: -(scrollerScope - boxScope),
                max: 0,
                preventDefault: _this.preventDefault,
                css: _this.css,
                // inertia: false,
                bindSelf: true,
                lockDirection: true,
                step: boxScope,
                touchEnd(e, v, index) {
                    // if (v > _this.threshold - 10 && _this.threshold > 0) {
                    //     this.to(_this.threshold)
                    //     this.forbiden = true
                    //     _this.$emit('refresh', e, v, this)
                    //     return false
                    // }
                    if (_this.slider) {
                        var step_v = index * this.step * -1;
                        var dx = v - step_v;
                        if (v < this.min) {
                            _this.disX = this.min
                        } else if (v > this.max) {
                            _this.disX = this.max
                        } else if (Math.abs(dx) < 30) {
                            _this.disX = step_v
                        } else if (dx > 0) {
                            _this.disX = step_v + this.step
                        } else {
                            _this.disX = step_v - this.step
                        }
                        this.to(_this.disX);
                        _this.$emit('slideEnd', index)
                        return false
                    }
                },
                pressMove(e, v) {
                    _this.$emit('pressMove', e, v, _this.touch)
                }
            }
            Transform(scroller)
            if (options.min >= options.max) {
                return
            }
            this.touch = new AlloyTouch(options)
        }
    }
}
</script>
<style lang="less">
.ts-scroller-box {
    width: 100%;
    height: auto;
    overflow: hidden;
    &.vertical {
        height: 100%;
    }
}

.ts-scroller {
    display: inline-block;
    width: auto;
    height: 100%;
    white-space: nowrap;
    &.vertical {
        width: 100%;
        height: auto;
    }
}
</style>