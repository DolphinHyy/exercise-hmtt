import request from "@/utils/request";
// import store from "@/store";

export const login = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });
// 获取验证码
export const getCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
// 获取用户信息
export const getUserInfo = () =>
  request({
    url: `/v1_0/user`,
    // 写在拦截器里
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
