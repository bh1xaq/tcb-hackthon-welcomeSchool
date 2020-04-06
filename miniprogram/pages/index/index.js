const app = getApp();
var Cloud = require("../../utils/cloud.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    showWeather: false,
    cardCur: 0,
    isLogin: false
  },

  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // 页面跳转
  jumpTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      appName: app.globalData.appName
    });
    Cloud.getWeather(app.globalData.localCity).then(res => {
      res = JSON.parse(res);
      if (res.code == 200) {
        _this.setData({
          weaImg: res.data.now_cond_img,
          weaTmp: res.data.now_cond_tmp,
          weaTxt: res.data.now_cond_txt,
          showWeather: true
        })
      }
    }).catch(err => {
      console.error("获取天气云函数调用出现异常", err)
    });

    // 轮播图
    wx.getStorage({
      key: "swiper",
      success: function (res) {
        _this.setData({
          swiperList: res.data
        });
      },
      fail: function (err) {
        console.error("getStorageERROR:swiper", err);
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '加载中...',
      mask: false
    })
    let _this = this;
    // 登录信息
    wx.getStorage({
      key: "user",
      success: function (res) {
        let user = res.data;
        _this.setData(user);
        // 刷新学生报道状态
        Cloud.checkRegister(_this.data.userId).then(res => {
          if (res.code == 200) {
            user.BDZT = res.data.BDZT;
            wx.setStorage({
              data: user,
              key: "user",
            })
            wx.hideLoading();
          }
        }).catch(err => {
          wx.hideLoading();
          console.error("刷新学生报道状态失败")
        });
      },
      fail: function (err) {
        wx.hideLoading();
        console.error("获取用户信息失败，可能是没有登录", err);
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})