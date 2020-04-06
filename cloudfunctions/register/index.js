/**
 * 函数名：新生报道
 * 功能：新生报道功能
 * 参数：userId（学工号）
 */
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let userId = event.userId;
    // 更新
    let updated = await db.collection("users").where({
        userId: userId
      })
      .update({
        data: {
          info: {
            private: {
              BD: {
                BDSJ: Math.round(new Date() / 1000),
                BDZT: true
              }
            }
          }
        }
      });
    console.log("update", updated);
    if (updated.stats.updated == 1) {
      return {
        code: "200",
        errMsg: "update ok"
      }
    } else {
      return {
        code: "500",
        errMsg: "更新数据库[users]异常"
      }
    }
  } catch (err) {
    return {
      code: "500",
      errMsg: err
    }
  }
}