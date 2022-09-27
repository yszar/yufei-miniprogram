// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  let q = 1000;
  if (event.q) {
    q = event.q;
    console.log(q);
  }
  return db
    .collection("video_app_list")
    .where({ is_show: true })
    .limit(q)
    .get();
};
