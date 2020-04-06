// miniprogram/pages/receivingStation/receivingStation.js
var Cloud = require("../../utils/cloud.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SFJZ: false
  },

  // 预约接站状态变化
  switchChange(event) {
    this.setData({
      SFJZ: event.detail.value
    })
  },
  // 表单提交
  setRsForm(form) {
    wx.showLoading({
      title: "提交中...",
      mask: false
    });
    console.log("表单提交", form.detail.value);
    Cloud.setReceivingStation(this.data.userId, form.detail.value).then(res => {
      if (res.code == 200) {
        wx.hideLoading();
        wx.showToast({
          title: "提交成功",
          icon: "success",
          duration: 2000
        })
      } else {
        wx.showToast({
          title: "提交失败",
          icon: "none",
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.error("更新预约接站信息异常", err)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.showLoading({
      title: "加载中...",
      mask: false
    });
    // 加载用户信息（userId）
    wx.getStorage({
      key: "user",
      success: function (res) {
        _this.setData({
          userId: res.data.userId
        });
        // 查询学生预约接站信息
        Cloud.getReceivingStation(res.data.userId).then(res => {
          if (res.code == 200) {
            console.log("获取预约接站信息成功", res.data)
            _this.setData({
              JZLY: res.data.JZLY,
              SFJZ: res.data.SFJZ
            }, function () {
              wx.hideLoading();
            })
          }
        }).catch(err => {
          wx.hideLoading();
          console.error("获取预约接站信息失败", err)
        });
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