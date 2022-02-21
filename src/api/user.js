import request from "@/utils/request";

export const login = (data) =>
  request({
    url: "/v1_0/authorizations",
    method: "POST",
    data,
  });

export const getCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`,
  });
