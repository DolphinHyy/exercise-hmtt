import request from "@/utils/request";

// const getNews = request({
//   url: "/app/v1_0/announcements/:target",
// });
// module.exports = {
//   getNews,
// };
export const test = () => {
  return request({
    url: "/v1_0/channels",
  });
};
