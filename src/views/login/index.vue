<template>
  <div class="login-container">
    <van-nav-bar class="navbar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号码"
        :rules="userMobileRules"
        autocomplete="off"
      >
        <i slot="left-icon" class="tt tt-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="text"
        name="code"
        placeholder="请填写验证码"
        :rules="userCodeRules"
      >
        <i slot="left-icon" class="tt tt-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDown"
            format="ss s"
            :time="1000 * 3"
            @finish="isCountDown = false"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            native-type="button"
            @click="sendSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, getCodeAPI } from "@/api";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      isCountDown: false,
      userMobileRules: [
        { required: true, message: "请填写手机号码" },
        {
          pattern: /^1[3|5|8|9]\d{9}$/,
          trigger: "onBlur",
          message: "手机号码格式不正确",
        },
      ],
      userCodeRules: [
        { required: true, message: "请填写验证码" },
        {
          pattern: /^\d{6}$/,
          trigger: "onBlur",
          message: "请输入正确的验证码",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit(values) {
      console.log("submit", values);
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: "登录中...", // 提示消息
      });
      try {
        let res = await loginAPI(this.user);
        console.log(res.data.data);
        this.$toast.success("登录成功");
        this.$store.commit("setUser", res.data.data);
        this.$router.back();
      } catch (error) {
        console.log("失败");
        this.$toast.fail("登录失败");
      }
    },
    async sendSendSms() {
      try {
        await this.$refs.loginForm.validate("mobile");
        console.log("手机校验成功，发送验证码");
      } catch (error) {
        console.log("手机号码校验失败", error);
        return;
      }
      try {
        let res = await getCodeAPI(this.user.mobile);
        console.log(res);
        this.$toast.success("验证码已发送");
        this.isCountDown = true;
      } catch (error) {
        this.isCountDownShow = false;
        if (error.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .navbar {
    background-color: #1989fa;
  }
  .van-nav-bar__title,
  .van-icon {
    color: #fff;
  }
}
</style>