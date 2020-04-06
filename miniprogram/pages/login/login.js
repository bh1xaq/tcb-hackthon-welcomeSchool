// miniprogram/pages/login/login.js
const app = getApp();
import WxValidate from "../../utils/wxvalidate/WxValidate.js";
var Md5 = require("../../utils/encrypt/md5.js");
var Cloud = require("../../utils/cloud.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpModal: false,
  },
  /**
   * HelpModal
   */
  showHelpModal() {
    this.setData({
      helpModal: true
    })
  },

  hideHelpModal() {
    this.setData({
      helpModal: false
    })
  },
  /**
   * 表单验证提交
   */
  initValidate() {
    // 验证规则
    const rules = {
      userId: {
        required: true
      },
      password: {
        required: true,
        minlength: 6
      }
    };
    //异常提示
    const messages = {
      userId: {
        required: "请输入账号",
      },
      password: {
        required: "请输入密码",
        minlength: "初始密码为生日，密码长度不应小于6位"
      }
    };
    // 初始化表单验证
    this.WxValidate = new WxValidate(rules, messages);
  },

  checkLoginForm(form) {
    let loginFormValue = form.detail.value;
    console.log("表单验证器", loginFormValue)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(loginFormValue)) {
      let error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false,
      });
      return false;
    } else {
      this.login(loginFormValue);
    }

  },
  /**
   * 登录流程
   */
  login(loginFormValue) {
    wx.showLoading({
      title: "登录中...",
      mask: false
    });
    loginFormValue.password = Md5.hexMD5(loginFormValue.password);
    console.log("登录流程", loginFormValue);
    Cloud.login(loginFormValue).then(res => {
      wx.hideLoading();
      switch (res.code) {
        case "200":
          try {
            wx.setStorage({
              key: "user",
              data: res.data,
              success: function () {
                wx.switchTab({
                  url: '/pages/index/index',
                });
              }
            })
          } catch (err) {
            console.error("setStorageERROR:user", err)
          }
          break;
        case "500":
        case "403":
          wx.showModal({
            content: res.errMsg,
            showCancel: false,
          });
          break;
      }
    }).catch(err => {
      console.error("登录异常", err);
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.initValidate();
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