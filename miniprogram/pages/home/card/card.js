// miniprogram/pages/home/atable.js
var wxbarcode = require('../../../utils/wxbarcode/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: "2019190432040",
    timer: ""
  },

  // 定义一个二维码生成规则：卡号+时间戳，30秒内有效，超时作废（实际情况需要与一卡通系统对接）
  showPayCode(userId) {
    let timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    let payCode = userId + "?ts=" + timestamp;
    wxbarcode.barcode('payCodeBar', payCode, 680, 200);
    wxbarcode.qrcode('payCodeQr', payCode, 420, 420);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      userId: options.userId
    }, function () {
      // 第一次展示支付码
      _this.showPayCode(_this.data.userId)
      // 支付码定时刷新
      _this.setData({
        timer: setInterval(function () {
          _this.showPayCode(_this.data.userId)
        }, 30000)
      })
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
    clearInterval(this.data.timer);
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