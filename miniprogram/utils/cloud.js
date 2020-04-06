// 云函数方法封装
module.exports = {
  // 获取大数据统计
  getBigData: function () {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getBigData",
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getBigData] 调用失败", err)
        }
      });
    });
  },
  // 获取场景
  getSceneDetail: function (markerId) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getSceneDetail",
        data: {
          markerId: markerId
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getSceneDetail] 调用失败", err)
        }
      });
    });
  },
  // 获取场景
  getScene: function (_id) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getScene",
        data: {
          _id: _id
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getScene] 调用失败", err)
        }
      });
    });
  },
  // 获取场景分类
  getSceneType: function () {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getSceneType",
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getSceneType] 调用失败", err)
        }
      });
    });
  },
  // 新生注册报道
  register: function (userId) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "register",
        data: {
          userId: userId
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [register] 调用失败", err)
        }
      });
    });
  },
  // 检查学生报道状态
  checkRegister: function (userId) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "checkRegister",
        data: {
          userId: userId
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [checkRegister] 调用失败", err)
        }
      });
    });
  },
  // 更新预约住宿信息
  setAccommodation: function (userId, accommodationInfo) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "setAccommodation",
        data: {
          userId: userId,
          accommodationInfo: accommodationInfo
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [setAccommodation] 调用失败", err)
        }
      });
    });
  },
  // 获取预约住宿信息
  getAccommodation: function (userId) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getAccommodation",
        data: {
          userId: userId
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getAccommodation] 调用失败", err)
        }
      });
    });
  },
  // 更新预约接站信息
  setReceivingStation: function (userId, receivingStationInfo) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "setReceivingStation",
        data: {
          userId: userId,
          receivingStationInfo: receivingStationInfo
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [setReceivingStation] 调用失败", err)
        }
      });
    });
  },
  // 获取预约接站信息
  getReceivingStation: function (userId) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getReceivingStation",
        data: {
          userId: userId
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getReceivingStation] 调用失败", err)
        }
      });
    });
  },
  // 更新用户信息
  setUserInfo: function (userId, privateInfo) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "setUserInfo",
        data: {
          userId: userId,
          privateInfo: privateInfo
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [setUserInfo] 调用失败", err)
        }
      });
    });
  },
  // 获取用户信息
  getUserInfo: function (userId, infoType) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getUserInfo",
        data: {
          userId: userId,
          infoType: infoType
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getUserInfo] 调用失败", err)
        }
      });
    });
  },
  // 用户登录
  login: function (userForm) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "login",
        data: {
          userId: userForm.userId,
          password: userForm.password
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [login] 调用失败", err)
        }
      });
    });
  },
  // 获取天气信息
  getWeather: function (city) {
    return new Promise(function (resolve, reject) {
      wx.cloud.callFunction({
        name: "getWeather",
        data: {
          location: city
        },
        success: function (res) {
          resolve(res.result);
        },
        fail: function (err) {
          console.error("[云函数] [getWeather] 调用失败", err)
        }
      });
    });
  },
};