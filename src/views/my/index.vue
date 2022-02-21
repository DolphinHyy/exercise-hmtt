<template>
  <div class="my-container">
    <div class="userInfo header" v-if="user">
      <!-- 基本信息 -->
      <div class="base">
        <div class="left">
          <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userInfo.art_count }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <img
        class="mobile-img"
        src="~@/assets/mobile.png"
        @click="$router.push('/login')"
      />
      <span>登录/注册</span>
    </div>
    <!-- 宫格 -->
    <van-grid class="nav-grid" :column-num="2" clickable>
      <van-grid-item text="收藏">
        <i slot="icon" class="tt tt-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item text="文字">
        <i slot="icon" class="tt tt-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <div class="grid-nav"></div>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <van-cell
      class="logout-cell"
      @click="onLogout"
      clickable
      v-if="user"
      title="退出登录"
    />
    <!-- 已登录 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserInfoAPI } from "@/api";
export default {
  name: "MyPage",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState([`user`]),
  },
  watch: {},
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog
        .confirm({
          title: "确认退出吗？",
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          console.log("取消执行这里");
        });
    },
    async loadUserInfo() {
      try {
        const { data } = await getUserInfoAPI();
        console.log(data);
        this.userInfo = data.data;
      } catch (error) {
        this.$toast("获取用户信息失败，请稍后重试");
        console.dir(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  > .header {
    height: 361px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    span {
      color: #fff;
      font-size: 28px;
    }
  }
}
.header {
  width: 750px;
  height: 401px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.userInfo {
  background: red;
  .base {
    width: 750px;
    height: 231px;
    padding: 76px 32px 23px;
    // background: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 29px;
        margin-left: 22px;
      }
    }
    .right {
      span {
        color: #000;
      }
    }
  }
}
.data {
  display: flex;
  width: 750px;
  justify-content: space-around;
  .data-item {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
  }
}
.nav-grid {
  background: #fff;
  .tt {
    font-size: 45px;
  }
  .tt-shoucang {
    color: #eb5253;
  }
  .tt-lishi {
    color: #ff9d1d;
  }
  .text {
    color: #000;
    margin-top: 8px;
    font-size: 28px;
  }
}
// .logout-cell {
//   width: 750px;
//   color: red;
//   text-align: center;
//   border-bottom: 1px solid #ddd;
// }
.logout-cell {
  height: 100px;
  text-align: center;
  color: #eb5253;
  margin: 10px 0;
  font-size: 30px;
}
</style>

