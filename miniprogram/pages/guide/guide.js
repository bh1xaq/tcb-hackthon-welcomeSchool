// miniprogram/pages/guide/guide.js
var Cloud = require("../../utils/cloud.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: -1,
    scrollLeft: 0,
    subkey: "VGGBZ-QYFWU-FG3VM-2UQEC-SUBQO-2QBAE", // 申请KEY：https://lbs.qq.com/
    longitude: "116.509080", // 中心坐标拾取工具：https://lbs.qq.com/tool/getpoint/
    latitude: "39.770740",
    markers: [{
      latitude: "39.771401",
      longitude: "116.506930",
      iconPath: "../../images/location.png",
      callout: {
        content: '北京电子科技职业学院（亦庄校区）',
        display: "ALWAYS",
        borderRadius: "20",
        padding: "5"
      }
    }],
    sceneType: [],
    detail: []
  },
  // 坐标详情信息Modal的展示与关闭
  showDetail(e) {
    wx.showLoading({
      title: "加载中...",
      mask: false
    });
    let _this = this;
    Cloud.getSceneDetail(e.markerId).then(res => {
      if (res.code == 200) {
        this.setData({
          detailModal: true,
          detail: res.data
        }, function () {
          wx.hideLoading();
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.error("获取场景详细信息出现异常", err);
    })
  },
  hideDetailModal() {
    this.setData({
      detailModal: false,
      detail: []
    })
  },
  // Tab选择
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 获取场景信息
  getScene(e) {
    wx.showLoading({
      title: "加载中...",
      mask: false
    });
    let _this = this;
    let sceneId = e.currentTarget.dataset.sceneid;
    Cloud.getScene(sceneId).then(res => {
      if (res.code == 200) {
        _this.setData({
          markers: res.data
        }, function () {
          wx.hideLoading();
        })
      } else {
        wx.hideLoading();
        console.error("按场景获取坐标失败了，可能是数据库没有初始化");
      }
    }).catch(err => {
      wx.hideLoading();
      console.error("按场景获取坐标点异常", err);
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
    Cloud.getSceneType().then(res => {
      if (res.code == 200) {
        _this.setData({
          sceneType: res.data
        }, function () {
          wx.hideLoading();
        });
      } else {
        wx.hideLoading();
        console.error("加载地图场景分类异常");
      }
    }).catch(err => {
      console.error("加载地图场景分类异常", err)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})