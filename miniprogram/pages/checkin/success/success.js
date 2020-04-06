// miniprogram/pages/checkin/success/success.js
var Cloud = require("../../../utils/cloud.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getStorage({
      key: "user",
      success(res) {
        Cloud.getUserInfo(res.data.userId, "public").then(res => {
          if (res.code == 200) {
            _this.setData({
              userName: res.data.XM
            });
          } else {
            console.error("云函数[getUserInfo]返回异常500或403");
          }
        }).catch(err => {
          console.error("获取用户公开信息异常", err);
        });
      }
    })

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