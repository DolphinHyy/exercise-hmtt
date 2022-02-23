import request from "@/utils/request";

export const getArticles = (params) =>
  request({
    url: "/v1_0/articles",
    params,
  });
