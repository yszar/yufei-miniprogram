// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = cloud.database();
const _ = db.command;

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db
      .collection("remove_logo_logs")
      .where({
        unionid: event.unionid,
      })
      .remove();
  } catch (e) {
    console.error(e);
  }
}
