/**
 * 函数名：按分类获取学校地图场景
 * 功能：按分类获取学校地图场景列表
 * 参数：_id
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {
  try {

    let map = await db.collection("schoolMap").where({
      _id: event._id
    }).get();

    let scene = [];
    let sceneData = map.data[0].data;

    if (map.data.length > 0) {

      for (let i = 0; i < sceneData.length; i++) {
        scene.push({
          id: sceneData[i].id,
          latitude: sceneData[i].latitude,
          longitude: sceneData[i].longitude,
          iconPath: "../../images/location.png",
          callout: {
            content: sceneData[i].name,
            display: "ALWAYS",
            borderRadius: "20",
            padding: "5"
          }
        });

      }

      return {
        code: "200",
        errMsg: "getScene ok",
        data: scene
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