/**
 * 函数名：获取用户信息
 * 功能：获取用户的详细信息
 * 参数：userId（学工号）,infoType（信息类型）
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let infoType = event.infoType;

    let user = await db.collection("users").where({
      userId: event.userId,
    }).get();

    if (user.data.length > 0) {
      // 获取公开信息
      if (infoType == "public") {
        return {
          code: "200",
          errMsg: "getUserInfo ok",
          data: user.data[0].info.public
        }
      }

      // 获取详情信息
      if (infoType == "private") {
        let privateData = Object.assign({
          userId: user.data[0].userId
        }, user.data[0].info.public, user.data[0].info.private);
        return {
          code: "200",
          errMsg: "getUserInfo ok",
          data: privateData
        }
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