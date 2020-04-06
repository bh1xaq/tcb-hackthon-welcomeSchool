// miniprogram/pages/home/modifyInfo/modifyInfo.js
import WxValidate from "../../../utils/wxvalidate/WxValidate.js";
var Cloud = require("../../../utils/cloud.js");
var Aes = require("../../../utils/encrypt/aes.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 表单验证提交
   */
  initValidate() {
    // 验证规则
    const rules = {
      LXDH: {
        required: true,
        tel: true
      },
      YHKH: {
        required: true,
        digits: true,
        rangelength: [13, 19]
      },
      SFZH: {
        required: true,
        idcard: true
      }
    };
    //异常提示
    const messages = {
      LXDH: {
        required: "请输入联系电话",
        tel: "所填联系电话不合法"
      },
      YHKH: {
        required: "请输入银行卡号",
        rangelength: "所填银行卡号不合法"
      },
      SFZH: {
        required: "请输入身份证号",
        idcard: "所填身份证号不合法"
      }
    };
    // 初始化表单验证
    this.WxValidate = new WxValidate(rules, messages);
  },

  checkUserInfoForm(form) {
    let userInfoValue = form.detail.value;
    console.log("表单验证器", userInfoValue)
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(userInfoValue)) {
      let error = this.WxValidate.errorList[0];
      wx.showModal({
        content: error.msg,
        showCancel: false,
      });
      return false;
    } else {
      this.setUserInfo(userInfoValue);
    }
  },
  // 更新用户信息
  setUserInfo(userInfoValue) {
    let _this = this;
    let userId = _this.data.XH;
    wx.showLoading({
      title: "提交中...",
      mask: false
    });
    // 加密
    let JM_SFZH = Aes.CryptoJS.AES.encrypt(userInfoValue.SFZH, app.globalData.AESKEY).toString();
    let JM_YHKH = Aes.CryptoJS.AES.encrypt(userInfoValue.YHKH, app.globalData.AESKEY).toString();

    console.log("加密调试:JM_SFZH", JM_SFZH);
    console.log("加密调试:JM_YHKH", JM_YHKH);

    // 更新表
    Cloud.setUserInfo(userId, {
      LXDH: userInfoValue.LXDH,
      JM_SFZH: JM_SFZH,
      JM_YHKH: JM_YHKH
    }).then(res => {
      if (res.code == 200) {
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: "更新成功",
              icon: "success",
              duration: 2000
            })
          }
        });
      } else {
        wx.hideLoading({
          complete: (res) => {
            wx.showToast({
              title: "更新失败",
              icon: "none",
              duration: 2000
            })
          }
        });
      }
    }).catch(err => {
      console.error("用户信息更新异常", err)
    });


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let infoType = "private";
    _this.initValidate();
    wx.showLoading({
      title: "加载中...",
      mask: false
    });
    // 获取用户信息
    Cloud.getUserInfo(options.userId, infoType).then(res => {
      if (res.code == 200) {
        // 敏感信息解密
        let YHKH = Aes.CryptoJS.AES.decrypt(res.data.JM_YHKH, app.globalData.AESKEY).toString(Aes.CryptoJS.enc.Utf8);
        let SFZH = Aes.CryptoJS.AES.decrypt(res.data.JM_SFZH, app.globalData.AESKEY).toString(Aes.CryptoJS.enc.Utf8);
        _this.setData({
          XH: res.data.userId,
          XM: res.data.XM,
          XB: res.data.XB,
          XY: res.data.XY,
          XZBJ: res.data.XZBJ,
          LXDH: res.data.LXDH,
          YHKH: YHKH,
          SFZH: SFZH
        }, function () {
          console.log("加载用户详情信息成功");
          wx.hideLoading();
        });
      } else {
        console.error("云函数[getUserInfo]返回异常500或403");
      }
    }).catch(err => {
      console.error("获取用户信息异常", err);
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