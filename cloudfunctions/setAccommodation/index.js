/**
 * 函数名：预约住宿
 * 功能：上报学生的住宿申请
 * 参数：userId（学工号）, accommodationInfo（是否住宿 bool）
 */
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let userId = event.userId;
    let accommodationInfo = event.accommodationInfo;
    console.log(accommodationInfo);
    // 更新
    let updated = await db.collection("users").where({
        userId: userId
      })
      .update({
        data: {
          info: {
            private: {
              accommodationInfo
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