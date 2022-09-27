const app = getApp();
Page({
  data: {
    swiperList: [],
    value: "",
    disabled: false,
    btnLoading: false,
    videoUrl: "",
    // 支持的平台
    appList: [],
  },
  onLoad() {
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "getAppList",
        // 传给云函数的参数
        data: {
          q: 8,
        },
        config: { env: wx.cloud.DYNAMIC_CURRENT_ENV },
      })
      .then((res) => {
        this.setData({ appList: res.result.data });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  onShow() {
    // this.setData({
    //   videoUrl: "",
    // });
  },
  // 监听用户滑动页面事件。
  onInput() {},
  toAppList() {
    wx.navigateTo({
      url: "/pages/logsAndList/applist/applist",
    });
  },
  clearVlaue() {
    this.setData({
      value: "",
    });
  },
  paste() {
    this.pastes();
  },
  pasteParse() {
    wx.getClipboardData()
      .then((res) => {
        this.setData({
          value: res.data,
        });
        this.oSubmit();
      })
      .catch((e) => {
        console.log(e);
      })
  },
  parse() {
    this.oSubmit();
  },
});
