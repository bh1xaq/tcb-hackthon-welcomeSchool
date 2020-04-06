/**
 * 生成一批测试用学生数据（100名）
 * 学号：10{xxx}
 * 密码：123456
 */
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

exports.main = async (event, context) => {

  let userList = [];

  let XY = ["电信工程学院", "汽车工程学院", "机电工程学院", "经济管理学院", "艺术设计学院", "生物工程学院", "基础学院"];

  let XB = ["男", "女"];

  for (let i = 0; i <= 100; i++) {
    let k = GetRandomNum(0, 7);
    let j = GetRandomNum(0, 1);

    userList.push({
      "userId": "10" + i,
      "password": "e10adc3949ba59abbe56e057f20f883e",
      "acl": "2",
      "openId": "o14Kg4oxFVF7yRcUWXVDeRhjg9CE",
      "info": {
        "public": {
          "XM": "测试用户" + i,
          "XB": XB[j],
          "XY": XY[k],
          "XZBJ": "测试班级",
          "ZP": "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/avatar_default.png"
        },
        "private": {
          "YYJZ": {
            "SFJZ": false,
            "JZLY": ""
          },
          "YYZS": false,
          "JM_YHKH": "",
          "JM_SFZH": "",
          "LXDH": "",
          "BD": {
            "BDSJ": "",
            "BDZT": false
          }
        }
      }
    })
  }
  return JSON.stringify(userList);
}