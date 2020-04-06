/**
 * 函数名：设置用户信息
 * 功能：修改用户的电话号码，银行卡号，身份证号等敏感信息
 * 参数：userId（学工号）, privateInfo（敏感信息Object-AES）
 */
const cloud = require('wx-server-sdk');

cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    // 解密
    let userId = event.userId;
    let privateInfo = event.privateInfo;
    // 更新
    let updated = await db.collection("users").where({
        userId: userId
      })
      .update({
        data: {
          info: {
            private: privateInfo
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