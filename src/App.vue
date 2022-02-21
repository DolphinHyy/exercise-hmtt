<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { testAPI } from "@/api";
export default {
  name: "app",
  async created() {
    try {
      let res = await testAPI();
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped lang='less'>
</style>