// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "yf-tools-5gwumn3lb5ba64bc" }); // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db
      .collection("remove_logo_logs")
      .where({
        _id: event._id,
      })
      .update({ data: { timestamp: Date.parse(new Date()) } })
      .then((res) => {
        if (res.stats.updated > 0) {
          console.log("更新成功");
        }
        console.log("rrrrr",res);
      });
  } catch (e) {
    console.error(e);
  }
};
