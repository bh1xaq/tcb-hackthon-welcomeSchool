// miniprogram/pages/home/index/index.js
var Cloud = require("../../../utils/cloud.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/images/avatar_default.png",
    userName: "欢迎报考本校",
    userIdentity: "请登录",
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let _this = this;
    // 登录信息
    wx.getStorage({
      key: "user",
      success: function (res) {
        let loginData = res.data;
        let infoType = "public";
        if (loginData.acl == 2) {
          loginData.userIdentity = "学生";
        } else {
          loginData.userIdentity = "管理员";
        }
        _this.setData(loginData);
        // 获取用户公开信息
        Cloud.getUserInfo(loginData.userId, infoType).then(res => {
          if (res.code == 200) {
            _this.setData({
              avatarUrl: res.data.ZP,
              userName: res.data.XM
            });
          } else {
            console.error("云函数[getUserInfo]返回异常500或403");
          }
        }).catch(err => {
          console.error("获取用户公开信息异常", err);
        });
      },
      fail: function (err) {
        wx.showModal({
          title: "未登录",
          content: "您还没有登录，操作将受到限制，是否登录？",
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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