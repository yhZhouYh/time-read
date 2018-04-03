<template>
    <div class="ts-h5-login" ref="box">
        <z-header bckColor="transparent">
            <span slot="middle">注册</span>
        </z-header>
        <div class="login-box">
            <img src="../../assets/imgs/logo.png" alt="" class="logo-img">
            <div class="login-group">
                <div class="input-box zflex tf-1px-b">
                    <icon icon="icon-shouji"></icon>
                    <x-input class="weui-input zflex1" placeholder="请输入手机号" type="number" v-model.trim="mobile" ref="mobile" is-type="china-mobile" required></x-input>
                </div>
                <div class="input-box zflex tf-1px-b password">
                    <icon icon="icon-yanzhengma"></icon>
                    <x-input type="text" class="weui-input zflex1" placeholder="请输入验证码" v-model.trim="verifyCode" required></x-input>
                    <verify-code @getcode="getcode" :valid="validMobile" class="ts-verify" v-touch-ripple></verify-code>
                </div>
                <div class="input-box zflex tf-1px-b password">
                    <icon icon="icon-yuechi"></icon>
                    <x-input type="password" class="weui-input zflex1" placeholder="请输入密码" v-model.trim="password" required></x-input>
                </div>
                <div class="input-box zflex tf-1px-b password">
                    <icon icon="icon-yuechi"></icon>
                    <x-input type="password" class="weui-input zflex1" placeholder="请确认密码" v-model.trim="ensurePassword" required></x-input>
                </div>

            </div>
            <!--  -->
            <x-button class="ts-btn" v-touch-ripple @click.native="register">注册</x-button>
        </div>
    </div>
</template>
<script>
import XInput from 'vux/src/components/x-input'
import XButton from 'vux/src/components/x-button'
import Icon from "../common/Icon";
import VerifyCode from "./verifyCode";
import { verifyCode, register } from "../../api";
import base64 from "base-64";
export default {
  name: "register",
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
      ensurePassword: "",
      validMobile: false,
      validCode: false
    };
  },
  methods: {
    async register() {
      this.validMobile = this.$refs.mobile.valid;
      if (!this.validMobile) {
        this.$toast("手机号码错误");
        return;
      }
      if (!this.verifyCode) {
        this.$toast("请填写验证码");
        return;
      }
      if (!this.password) {
        this.$toast("请填写密码");
        return;
      }
      if (!this.ensurePassword) {
        this.$toast("请确认密码");
        return;
      }
      if (this.password != this.ensurePassword) {
        this.$toast("两次输入密码不一致");
        return;
      }
      await register({
        mobile: this.mobile,
        code: this.verifyCode,
        password: base64.encode(this.password),
        verifyCode: this.verifyCode
      });
      this.$toast("注册成功");
      this.$router.go(-1);
    },
    async getcode() {
      this.validMobile = this.$refs.mobile.valid;
      if (!this.validMobile) {
        this.$toast("手机号码错误");
        return;
      }
      let data = await verifyCode({ mobile: this.mobile, type: "0" });
    }
  }
};
</script>
<style>

</style>

