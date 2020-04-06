/**
 * 函数名：获取地图场景描述信息
 * 功能：获取地图场景描述信息
 * 参数：markerId（markerId）
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {

    let marker = await db.collection("SchoolMapDetails").where({
      id: Number(event.markerId)
    }).get();

    if (marker.data.length > 0) {
      return {
        code: "200",
        errMsg: "getSceneDetail ok",
        data: {
          desc: marker.data[0].desc,
          img: marker.data[0].img,
          name: marker.data[0].name
        }
      }
    } else {
      return {
        code: "-1",
        errMsg: "未能取得地图数据，可能是数据库未初始化"
      }
    }
  } catch (err) {
    return {
      code: "500",
      errMsg: err
    }
  }
}