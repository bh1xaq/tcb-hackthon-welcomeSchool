/**
 * 函数名：预约接站
 * 功能：上报学生的预约接站情况
 * 参数：userId（学工号）, receivingStationInfo（接站信息 Object）
 */
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let userId = event.userId;
    let receivingStationInfo = event.receivingStationInfo;
    // 更新
    let updated = await db.collection("users").where({
        userId: userId
      })
      .update({
        data: {
          info: {
            private: {
              YYJZ: receivingStationInfo
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