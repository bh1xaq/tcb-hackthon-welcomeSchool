App({
  onLaunch: function () {
    let _this = this;
    // 取设备尺寸
    wx.getSystemInfo({
      success(res) {
        console.log("取设备信息成功", res);
        _this.globalData.StatusBar = res.statusBarHeight;
        _this.globalData.screenWidth = res.screenWidth;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          _this.globalData.Custom = capsule;
          _this.globalData.CustomBar = capsule.bottom + capsule.top - res.statusBarHeight;
        } else {
          _this.globalData.CustomBar = res.statusBarHeight + 50;
        }
      }
    });
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error("基础库异常", "请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "wel-5kx7f", // 此处填写envID
        traceUser: true
      });
    };
    // 预加载字体
    wx.loadFontFace({
      global: true,
      family: "YRDZST",
      source: "url('https://7765-wel-5kx7f-1301750085.tcb.qcloud.la/DrYang-Semibold.ttf')",
      success: function () {
        console.log("加载字体[杨任东竹石体-Semibold]成功");
      },
      fail: function (err) {
        console.error("加载字体[杨任东竹石体-Semibold]失败", err);
      },
    })
  },
  globalData: {
    AESKEY: "www.txisfine.cn"
  }
});