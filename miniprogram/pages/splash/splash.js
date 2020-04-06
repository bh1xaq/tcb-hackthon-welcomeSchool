const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    splashImg: "../../images/splash.png",
    timer: ''
  },

  initApp: function(_this) {
    return new Promise(function(resolve, reject) {
      // 获取appSetting
      wx.cloud.database().collection('schoolInfo').where({
        type: 'appSetting'
      }).get({
        success: function(res) {
          let appSetting = res.data[0].appSetting;
          console.log("获取appSetting成功", appSetting)
          app.globalData.appName = appSetting.appName;
          app.globalData.localCity = appSetting.localCity;
        },
        fail: function(err) {
          console.error("未能获取appSetting，请检查数据库是否导入初始化文件", err)
        }
      });
      // 获取轮播信息
      wx.cloud.database().collection('schoolInfo').where({
        type: 'swiper'
      }).get({
        success: function(res) {
          let swiper = res.data[0].swiper;
          console.log("获取swiper成功", swiper)
          try {
            wx.setStorage({
              key: "swiper",
              data: swiper
            })
          } catch (err) {
            console.error("setStorageERROR:swiper", err)
          }
        },
        fail: function(err) {
          console.error("未能获取swiper，请检查数据库是否导入初始化文件", err)
        }
      });
      resolve();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    _this.initApp(_this).then(function() {
      _this.setData({
        timer: setInterval(function() {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 1000)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})