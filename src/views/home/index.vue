<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <ArticleList :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="tt tt-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannelsAPI } from "@/api";
import ArticleList from "./components/article-list.vue";
export default {
  name: "HomeIndex",
  components: {
    ArticleList,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadChannels();
  },
  mounted() {},
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannelsAPI();
        this.channels = data.data.channels;
      } catch (err) {
        this.$toast("获取频道列表数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-bottom: 100px;
  padding-top: 180px;
  .page-nav-bar {
    background-color: #1989fa;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .van-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }

    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 2;
  width: 100%;
}
</style>

