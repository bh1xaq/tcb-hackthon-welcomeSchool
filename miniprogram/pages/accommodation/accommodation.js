// miniprogram/pages/accommodation/accommodation.js
var Cloud = require("../../utils/cloud.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    YYZS: false
  },
  // 预约住宿状态变化
  switchChange(event) {
    this.setData({
      YYZS: event.detail.value
    })
  },
  // 表单提交
  setRsForm(form) {
    wx.showLoading({
      title: "提交中...",
      mask: false
    });
    console.log("表单提交", form.detail.value);
    Cloud.setAccommodation(this.data.userId, form.detail.value).then(res => {
      console.log(res);
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
      console.error("更新预约住宿信息异常", err)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let accommodationTips;
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
        // 查询学生预约住宿信息
        Cloud.getAccommodation(res.data.userId).then(res => {
          console.log(res);
          if (res.code == 200) {
            console.log("获取预约住宿信息成功", res.data)
            // 输出提示
            if (res.data) {
              accommodationTips = "已预约";
            } else {
              accommodationTips = "未预约"
            }
            _this.setData({
              YYZS: res.data,
              accommodationTips: accommodationTips
            }, function () {
              wx.hideLoading();
            })
          }
        }).catch(err => {
          wx.hideLoading();
          console.error("获取预约住宿信息失败", err)
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