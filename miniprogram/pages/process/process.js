// miniprogram/pages/process/process.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    wx.showLoading({
      title: "加载中",
      mask: false
    });
    wx.cloud.database().collection('schoolInfo').where({
      type: 'process'
    }).get({
      success: function(res) {
        let process = res.data[0].process;
        console.log("获取process成功", process)
        _this.setData({
          processList: process
        }, function() {
          wx.hideLoading();
        })
      },
      fail: function(err) {
        console.error("未能获取process，请检查数据库是否导入初始化文件", err)
      }
    });
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