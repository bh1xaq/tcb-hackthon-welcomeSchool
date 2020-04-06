// miniprogram/pages/schoolSurvey/schoolSurvey.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    schoolSurvey: [{
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_1.png"
    }, {
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_2.png"
    }, {
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_3.png"
    }, {
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_4.png"
    }, {
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_5.png"
    }, {
      src: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/schoolSurvey/bg_6.png"
    }],
    screenWidth: app.globalData.screenWidth,
    screenHeight: app.globalData.screenHeight
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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