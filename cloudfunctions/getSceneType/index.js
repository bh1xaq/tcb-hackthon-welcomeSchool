/**
 * 函数名：获取学校地图场景分类
 * 功能：获取学校地图场景分类
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {

    let map = await db.collection("schoolMap").field({
      type: true
    }).get();

    if (map.data.length > 0) {

      return {
        code: "200",
        errMsg: "getSceneType ok",
        data: map.data
      }

    } else {
      return {
        code: "-1",
        errMsg: "未能取得地图分类数据，可能是数据库未初始化"
      }
    }

  } catch (err) {
    return {
      code: "500",
      errMsg: err
    }
  }
}