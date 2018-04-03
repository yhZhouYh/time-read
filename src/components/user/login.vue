<template>
    <div class="ts-index ts-h5-login" ref="box" :style="{height: viewPortHeight + 'px'}">
        <z-header bckColor="transparent">
            <span slot="middle">登陆</span>
        </z-header>
        <div class="login-box">
            <img src="../../assets/imgs/logo.png" alt="" class="logo-img">
            <div class="login-group">
                <div class="input-box zflex tf-1px-b">
                    <icon icon="icon-shouji"></icon>
                    <x-input class="weui-input zflex1" placeholder="请输入手机号"  type="number" v-model.trim="mobile" ref="mobile" is-type="china-mobile" required></x-input>
                </div>
                <div class="input-box zflex tf-1px-b password" v-show="passwordLogin">
                    <icon icon="icon-yuechi"></icon>
                    <x-input type="password" class="weui-input zflex1" placeholder="请输入密码" v-model.trim="password"></x-input>
                </div>
                <div class="input-box zflex tf-1px-b password" v-show="!passwordLogin">
                    <icon icon="icon-yanzhengma"></icon>
                    <x-input type="text" class="weui-input zflex1" placeholder="请输入验证码" v-model.trim="verifyCode"></x-input>
                    <verify-code @getcode="getcode" :valid="validMobile" class="ts-verify" v-touch-ripple></verify-code>
                    <!-- <x-button class="verify-btn" @getcode="getcode">
                                                        <verify-code  :valid="!verifyCode"></verify-code>
                                                    </x-button> -->
                </div>
            </div>
            <div class="login-way zflex">
                <span class="zflex1"><router-link :to="{name:'forgetPass'}" >忘记密码</router-link></span>
                <span v-show="passwordLogin" @click="changeLoginWay">手机验证码登录</span>
                <span v-show="!passwordLogin" @click="changeLoginWay">账号密码登录</span>
            </div>
            <x-button class="ts-btn" v-touch-ripple @click.native="login">登录</x-button>
            <div class="goregister">
                没有账号？
                <router-link :to="{name: 'register'}" class="register">立即注册></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import XInput from 'vux/src/components/x-input'
import XButton from 'vux/src/components/x-button'
import Icon from "../common/Icon";
import VerifyCode from "./verifyCode";
import { login, verifyCode, getUserInfo } from "../../api";
import base64 from "base-64";
import Vue from "vue";
export default {
  name: "login",
  components: {
    XInput,
    XButton,
    Icon,
    VerifyCode
  },
  data() {
    return {
      mobile: "",
      password: "",
      verifyCode: "",
      passwordLogin: true,
      validMobile: false,
      validCode: false,
      viewPortHeight: 0
    };
  },
  mounted(){
    //处理
    this.viewPortHeight = document.documentElement.clientHeight

  },
  methods: {
   

    changeLoginWay() {
      this.passwordLogin = !this.passwordLogin;
    },
    async login() {
      this.validMobile = this.$refs.mobile.valid;
      if (!this.validMobile) {
        this.$toast("手机号码错误");
        return;
      }
      let params = { mobile: this.mobile };
      if (this.passwordLogin) {
        if (!this.password) {
          this.$toast("请填写密码");
          return;
        }
        params = Object.assign({}, params, {
          password: base64.encode(this.password)
        });
      } else {
        if (!this.verifyCode) {
          this.$toast("请输入校验码");
          return;
        }
        params = Object.assign({}, params, { phoneCode: this.verifyCode });
      }
      let data = await login(params);
      this.$store.dispatch("setAccount", data);
      let userInfo = await getUserInfo();
      this.$store.dispatch("setAccount", Object.assign(data, userInfo));
      Vue.prototype.$login = true; //登陆判断
      const redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.replace(redirect);
      } else {
        this.$router.replace("/");
      }
    },
    async getcode() {
      this.validMobile = this.$refs.mobile.valid;
      if (!this.validMobile) {
        this.$toast("手机号码错误");
        return;
      }
      let data = await verifyCode({ mobile: this.mobile, type: "1" });
    }
  }
};
</script>
<style lang="less">
.ts-h5-login {
  width: 100%;
  min-height: 100%;
  background-size: cover;
  background-position: top 0;
  background-image: url("http://static.timeface.cn/times/5af6fbd74a9aad326af1e83f5c27e41f.jpg");
}

.ts-verify {
  background: #ff6b50;
  font-size: 0.28rem;
  color: #fff; // width: 1.6rem;
  padding: 0.03rem 0.18rem;
  border-radius: 3px;
}

.login-box {
  padding: 1.75rem 1.34rem 0;
  text-align: center;
  .logo-img {
    width: 3.05rem;
  }
  .weui-cell {
    padding: 0;
    &:before {
      border-top: 0;
    }
  }
  .login-group {
    margin-top: 1rem;
    color: #fff;
    .input-box {
      margin-top: 0.5rem;
      padding-bottom: 0.135rem;
      &:first-child {
        margin-top: 0;
      } // &.password {
      //     .zicon {
      //         font-size: 0.46rem;
      //     }
      // }
      .zicon {
        font-size: 0.48rem;
        color: #fff;
        margin-right: 0.3rem;
      }
    }
  }
  .login-way {
    margin-top: 0.22rem;
    color: #ffbf01;
    span {
      text-align: left;
      // &:first-child {
      //     color: #b4b4b4;
      // }
    }
    a {
      color: #b4b4b4;
    }
  }
  .ts-btn {
    margin-top: 0.82rem;
  }
  .verify-btn {
    background: #ff6b50;
    font-size: 0.28rem;
    color: #fff;
    width: 1.7rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    &:active {
      background: #ef8c7a !important;
      color: #666 !important;
    }
  }
}
.goregister {
  margin-top: 0.36rem;
  color: #b4b4b4;
  .register {
    color: #ffbf01;
  }
}
</style>



