// miniprogram/pages/checkin/checkin/checkin.js
var Cloud = require("../../../utils/cloud.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 扫码
  scanfQr() {
    var _this = this;
    wx.scanCode({
      success: (res) => {
        wx.showLoading({
          title: "验证中...",
          mask: false
        });
        let code = this.checkQr(res.result);
        if (code == 0) {
          Cloud.register(_this.data.userId).then(res => {
            if (res.code == 200) {
              wx.hideLoading();
              wx.redirectTo({
                url: '../success/success',
              })
            }
          }).catch(err => {
            wx.hideLoading();
            wx.showToast({
              title: "异常，请联系工作人员",
              icon: "none",
              duration: 2000
            })
            console.error("新生报道异常", err);
          });
          // 上传跳转
        }
        if (code == 1) {
          wx.showToast({
            title: "二维码已过期",
            icon: "none",
            duration: 2000
          })
        }
        if (code == 3) {
          wx.showToast({
            title: "异常，请联系工作人员",
            icon: "none",
            duration: 2000
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '识别失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // 二维码合法性校验(0:succ,1:expire,2:err)
  checkQr(qrCode) {
    // 传入的qrCode是一个截至时间戳，当前时间必须早于这个时间戳，否则无效
    try {
      let now = Math.round(new Date() / 1000);
      if (qrCode - now > 0) {
        return "0";
      } else {
        return "1";
      }
    } catch (err) {
      console.error("二维码合法性校验异常", err);
      return "2";
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 登录信息
    wx.getStorage({
      key: "user",
      success: function (res) {
        _this.setData({
          userId: res.data.userId
        })
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