// miniprogram/pages/bigData/bigData.js
const app = getApp();

var Cloud = require("../../utils/cloud.js");
var wxCharts = require("../../utils/wxcharts.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 绘制统计图
  drawCount(reportedCount, unreportedCount, detail) {
    let _this = this;
    let width = app.globalData.screenWidth;
    wx.hideLoading();

    // 报到率
    new wxCharts({
      canvasId: "rate",
      type: "pie",
      background: "#f1f1f1",
      series: [{
        name: "已报到",
        color: "#0081ff",
        data: reportedCount
      }, {
        name: "未报到",
        color: "#39b54a",
        data: unreportedCount
      }],
      width: width,
      height: 200,
      dataLabel: true
    });
    // 各学院报到率
    new wxCharts({
      canvasId: "rateByXY",
      type: "column",
      background: "#f1f1f1",
      categories: detail.categories,
      series: [{
        name: "已报到",
        color: "#0081ff",
        data: detail.reportedCountByCategories
      }, {
        name: "未报到",
        color: "#39b54a",
        data: detail.unreportedCountByCategories
      }],
      width: width,
      height: 200,
      dataLabel: true
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;

    wx.showLoading({
      title: "统计中...",
      mask: false
    });
    Cloud.getBigData().then(res => {
      if (res.code == 200) {
        let bigDataRes = res.data
        console.log("获取大数据统计成功", bigDataRes);
        _this.setData(bigDataRes);
        _this.drawCount(bigDataRes.reportedCount, bigDataRes.unreportedCount, bigDataRes.detail);
      }
    }).catch(err => {
      console.error("获取大数据统计出错", err);
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