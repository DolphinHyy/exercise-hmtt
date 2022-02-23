<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
        <!-- <van-cell
          v-for="article in list"
          :key="article.art_id"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from "@/api";
import ArticleItem from "@/views/home/components/article-item";
export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      isLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    // onLoad() {
    //   console.log("onLoad");
    //   // 1. 请求获取数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     // 2. 把请求结果数据放到 list 数组中
    //     for (let i = 0; i < 10; i++) {
    //       // 0 + 1 = 1
    //       // 1 + 1 = 2
    //       // 2 + 1 = 3
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 3. 本次数据加载结束之后要把加载状态设置为结束
    //     //     loading 关闭以后才能触发下一次的加载更多
    //     this.loading = false;

    //     // 4. 判断数据是否全部加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    async onLoad() {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        let result = data.data.results;
        // console.log(result);
        this.list.push(...result);
        // 测试读取失败时van-list组件错误提示功能
        // if (Math.random() > 0.5) {
        //   JSON.parse("asdasd");
        // }
        // 1. 请求获取数据
        // 2. 把请求结果数据放到 list 数组中
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        if (result.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (error) {
        console.dir(error);
        this.error = true;
        this.loading = false;
        this.$toast("读取文章列表错误");
      }

      // 4. 判断数据是否全部加载完成
      // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
      // this.finished = true;
    },
    async onRefresh() {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道ID
          timestamp: Date.now(),
          with_top: 1,
        });
        this.list.unshift(...data.data.results);
        this.loading = false;
        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
        this.isLoading = false;
      } catch (error) {
        console.log("请求失败", error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>

