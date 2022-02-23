import axios from "axios";
import store from "@/store";
import router from "@/router";

const request = axios.create({
  baseURL: "http://toutiao.itheima.net/", // 基础路径
});
// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config:请求配置对象
    const user = store.state.user;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // console.log(config);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  function (response) {
    console.log(111);
    return response;
  },
  function (error) {
    // 对请求错误做些什么

    if (error.response.status === 401) {
      alert("token失效了");
      // 跳转到登录页
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default request;
