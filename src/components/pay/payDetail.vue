<template>
  <div class="ts-index pay-detail">
    <z-header bckColor="#3d3c3e">
      <span slot="middle">订单详情</span>
      <search-icon slot="left"></search-icon>
      <home-icon slot="right"></home-icon>
    </z-header>
    <div class="ts-container">
      <book-detail :bookDetail="bookDetail"></book-detail>
      <div class="ts-box zflex">
        <check-icon :value.sync="wechatPay" class="payIcon zflex1" @click.native="clickWechat" v-if="isWX">
          <div class="payIconBox tf-1px" v-touch-ripple>
            <img src="../../assets/imgs/wechatPay.jpg" alt="">
          </div>
        </check-icon>
        <check-icon :value.sync="aliPay" class="payIcon zflex1" @click.native="clickAli">
          <div class="payIconBox tf-1px" v-touch-ripple>
            <img src="../../assets/imgs/aliPay.jpg" alt="">
          </div>
        </check-icon>
      </div>
      <!-- <div id="wechatQrcode" v-if="qrcode">
                      <img :src="qrcode" alt="">
                      <p>长按识别二维码支付</p>
                  </div> -->
      <x-button class="ts-btn" v-touch-ripple @click.native="buy">确认支付￥{{bookDetail.discountPrice}}</x-button>
      <div id="aliPayForm" ref="alipayform"></div>
      <!-- <div id="wechatQrcode" v-if="qrcode">
                      <img :src="qrcode" alt="">
                  </div> -->
      <div class="ali-mask" v-show="showMask" @click="closeMask">
        <img src="../../assets/imgs/shareArrow.png" alt="">
        <p>请在浏览器中打开</p>
      </div>
    </div>

  </div>
</template>
<script>
import { bookDetails, pay } from '../../api'
import CheckIcon from 'vux/src/components/check-icon'
import XButton from 'vux/src/components/x-button'
import dateFormat from '../filters/timeFormat'
import bookDetail from '../book/detail'
export default {
  name: 'pay-detail',
  components: {
    CheckIcon,
    XButton,
    bookDetail
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to);
  //   console.log(from);
  //   console.log(location.href);
  //   var ua = navigator.userAgent.toLowerCase();
  //   if (
  //     ua.match(/MicroMessenger/i) == "micromessenger" &&
  //     !(to.query.code || location.search.indexOf("code") > -1)
  //   ) {
  //     location.replace(
  //       "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx156797003156a1d1&redirect_uri=" +
  //         encodeURIComponent(
  //           location.origin + location.pathname + "#" + to.fullPath
  //         ) +
  //         "&response_type=code&scope=snsapi_base&state=123#wechat_redirect"
  //     );
  //     next();
  //   } else {
  //     next();
  //   }
  // },
  data() {
    return {
      bookId: this.$route.params.bookId,
      bookDetail: {},
      wechatPay: false,
      aliPay: true,
      showMask: false,
      qrcode: '',
      origin: 'http://timestudy.v5time.net'
    }
  },
  computed: {
    isWX() {
      return this.isWeiXin()
    }
  },
  async created() {
    this.bookDetail = await bookDetails({ bookId: this.bookId })
    // setTimeout(()=>{
    //     this.bookDetail = bookDetail
    // },3000)
    if (this.bookDetail.isBuy) {
      const redirect = this.$route.query.redirect
      if (redirect) {
        this.$router.replace({ path: redirect, query: { isPay: 1 } })
      }
    }
  },
  methods: {
    GetQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg) //获取url中"?"符后的字符串并正则匹配
      var context = ''
      if (r != null) context = r[2]
      reg = null
      r = null
      return context == null || context == '' || context == 'undefined'
        ? ''
        : context
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    closeMask() {
      this.showMask = false
    },
    onBridgeReady(data) {
      var that = this
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: data.appId,
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.pkg,
          signType: data.signType,
          paySign: data.paySign
        },
        function(res) {
          console.log(res)
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            alert('购买成功')
            that.$router.go(-1)
          }
          if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            alert('交易取消')
            that.$router.go(-1)
          }
          if (res.err_msg == 'get_brand_wcpay_request:fail') {
            alert('fail')
            that.$router.go(-1)
          }
        }
      )
    },
    wxH5Wx(data) {
      var that = this
      if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
          document.addEventListener(
            'WeixinJSBridgeReady',
            () => {
              that.onBridgeReady(data)
            },
            false
          )
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', () => {
            that.onBridgeReady(data)
          })
          document.attachEvent('onWeixinJSBridgeReady', () => {
            that.onBridgeReady(data)
          })
        }
      } else {
        that.onBridgeReady(data, that)
      }
    },
    clickWechat() {
      this.aliPay = false
    },
    clickAli() {
      this.wechatPay = false
    },
    async buy() {
      let type = 0
      if (this.aliPay) {
        type = 1
      }
      let surl = ''
      let redirect = this.$route.query.location
      if (redirect) {
        surl = redirect
      }
      let params = {
        type,
        orderId: this.$route.params.orderId,
        successUrl: surl,
        h5: '1'
      }
      params.code = this.$route.query.code || this.GetQueryString('code')
      let data = await pay(params)
      let bool = this.isWeiXin()
      if (type == 1 && bool) {
        this.$router.push({
          name: 'payAli',
          query: {
            form: data.substring(
              data.indexOf('<form>'),
              data.indexOf('</form>')
            )
          }
        })
      } else if (type == 1 && !bool) {
        //  this.$router.push({ name: 'payAli', query: { form: data } })
        this.$refs.alipayform.innerHTML = data.substring(
          data.indexOf('<form>'),
          data.indexOf('</form>')
        )
        document.forms['punchout_form'].submit()
      } else if (type == 0 && bool) {
        this.wxH5Wx(data)
      }
      // if (type == 1 && bool) {
      //     this.showMask = true
      // } else if (type == 1 && !bool) {
      //     this.$refs.alipayform.innerHTML = data
      //     document.forms['alipaysubmit'].submit();
      // } else if (type == 0) {
      //     // this.qrcode = data
      //     // location.href= data
      // }
    }
  }
}
</script>
<style lang="less">
.payIconBox {
  width: 2.2rem;
  height: 0.9rem;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  line-height: 0.9rem;
  &.tf-1px:before {
    border-color: #e1e1e1;
  }
}

.payIcon {
  img {
    width: 1.6rem;
  }
}

.pay-detail {
  .ts-btn {
    width: 5.95rem;
    margin-top: 0.6rem;
  }
}

.ali-mask {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: right;
  padding-right: 0.3rem;
  padding-top: 0.3rem;
  color: #fff;
  img {
    width: 0.94rem;
  }
}

#wechatQrcode {
  width: 3rem;
  text-align: center;
  margin: 0.5rem auto 0;
}
</style>

