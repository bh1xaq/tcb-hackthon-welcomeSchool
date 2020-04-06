/**
 * 函数名：登录
 * 功能：验证用户名密码，完成统一身份认证账号绑定微信
 * 参数：userId（学工号）,password（密码）
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {
    let openId = cloud.getWXContext().OPENID;

    let user = await db.collection("users").where({
      userId: event.userId,
      password: event.password
    }).get();

    if (user.data.length > 0) {
      // 合法用户，未绑定
      if (user.data[0].openId == "") {
        // 绑定
        await db.collection("users").doc(user.data[0]._id).update({
          data: {
            openId: openId
          }
        });
      } else if (user.data[0].openId != openId) {
        return {
          code: "403",
          errMsg: "验证微信绑定关系失败，若解绑请联系系统管理员"
        }
      }
      return {
        code: "200",
        errMsg: "login ok",
        data: {
          openId: user.data[0].openId,
          userId: user.data[0].userId,
          acl: user.data[0].acl,
          isLogin: true,
          BDZT: user.data[0].info.private.BD.BDZT
        }
      }

    } else {
      return {
        code: "403",
        errMsg: "用户名密码错误或您没有权限访问"
      }
    }

  } catch (err) {
    return {
      code: "500",
      errMsg: err
    }
  }
}