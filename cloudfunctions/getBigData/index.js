/**
 * 函数名：大数据统计
 * 功能：统计新生的报道情况
 * 备注：临时写法，下个版本废弃
 */
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();

exports.main = async (event, context) => {

  try {
    // 变量表
    let reportedCountByCategories = []; // 按学院分组的已报道人数
    let unreportedCountByCategories = []; // 按学院分组的未报道人数
    let categories = []; // 学院列表
    let studentTotal; // 学生总人数
    let reportedCount; // 已报到人数
    let unreportedCount; // 未报到人数


    // 获取新生总人数（即表中非教师的用户，acl=2）
    studentTotal = await db
      .collection("users")
      .where({
        acl: "2"
      }).get();

    // 获取已经报道的人数
    reportedCount = await db
      .collection("users")
      .where({
        acl: "2",
        info: {
          private: {
            BD: {
              BDZT: true
            }
          }
        }
      }).get();


    studentTotal = studentTotal.data.length; // 学生总人数
    reportedCount = reportedCount.data.length; // 已经报道人数
    unreportedCount = studentTotal - reportedCount; // 没有报道的人数

    //console.log("学生总人数:" + studentTotal + ",已经报道人数" + reportedCount + ",没有报道的人数" + unreportedCount);

    // 分组

    let XY = await db.collection("users").aggregate().group({
      _id: "$info.public.XY"
    }).end()

    for (let i = 0; i < XY.list.length; i++) {

      if (XY.list[i]._id != null) {
        categories.push(XY.list[i]._id);
      }

    }

    // 按学院统计报道情况（迷惑写法）
    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      // 按学院（已报道）
      let YBD = await db
        .collection("users")
        .where({
          acl: "2",
          info: {
            public: {
              XY: categories[i]
            },
            private: {
              BD: {
                BDZT: true
              }
            }
          }
        }).get();
      // 未报到
      let WBD = await db
        .collection("users")
        .where({
          acl: "2",
          info: {
            public: {
              XY: categories[i]
            },
            private: {
              BD: {
                BDZT: false
              }
            }
          }
        }).get();
      // 压数据
      unreportedCountByCategories.push(WBD.data.length);
      reportedCountByCategories.push(YBD.data.length);
    }

    return {
      code: 200,
      errMsg: "getBigData Ok",
      data: {
        studentTotal: studentTotal,
        reportedCount: reportedCount,
        unreportedCount: unreportedCount,
        detail: {
          categories: categories,
          reportedCountByCategories: reportedCountByCategories,
          unreportedCountByCategories: unreportedCountByCategories
        }
      }
    }

  } catch (err) {
    return {
      code: 500,
      errMsg: err
    }
  }

}