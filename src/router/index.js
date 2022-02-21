import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "@/views/login";
import Layout from "@/views/layout";
Vue.use(VueRouter);
const routes = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/login",
    name: "loginPage",
    component: LoginPage,
  },
  {
    path: "/",
    // name: "layout",
    component: Layout,
    children: [
      {
        path: "",
        name: "HomePage",
        component: () => import("@/views/home"),
      },
      {
        path: "/qa",
        name: "QaPage",
        component: () => import("@/views/qa"),
      },
      {
        path: "/video",
        name: "VideoPage",
        component: () => import("@/views/video"),
      },
      {
        path: "/my",
        name: "MyPage",
        component: () => import("@/views/my"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
