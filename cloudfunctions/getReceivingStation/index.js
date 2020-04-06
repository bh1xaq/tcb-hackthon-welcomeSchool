/**
 * 函数名：获取学生接站信息
 * 功能：获取学生预约接站信息
 * 参数：userId（学工号）
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {

    let user = await db.collection("users").where({
      userId: event.userId,
    }).get();

    if (user.data.length > 0) {

      return {
        code: "200",
        errMsg: "getReceivingStation ok",
        data: user.data[0].info.private.YYJZ
      }

    } else {
      return {
        code: "403",
        errMsg: "用户信息不存在，可能存在未授权的访问"
      }
    }

  } catch (err) {
    return {
      code: "500",
      errMsg: err
    }
  }
}