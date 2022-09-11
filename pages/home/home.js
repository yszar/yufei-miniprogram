const app = getApp();
Page({
  data: {
    scrollTop: 0,
    swiperList: [],
    value: "",
    disabled: false,
    videoUrl: "",
    pasteParseLoading: false,
    parseLoading: false,
    // 支持的平台
    appList: [],
  },
  onLoad() {
    this.setData({
      appList: this.data.$cuData.appList,
    });
  },
  onShow() {
    this.setData({
      videoUrl: "",
    });
  },
  // 监听用户滑动页面事件。
  onPageScroll(e) {
    // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
    // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
    // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
    this.setData({
      scrollTop: e.scrollTop,
    });
  },
  onInput() {},
  toAppList() {
    wx.navigateTo({
      url: "/pages/logsAndList/pages/applist/applist",
    });
  },
  clearVlaue() {
    this.setData({
      value: "",
      videoUrl: "",
    });
  },
  paste() {
    this.pastes();
  },
  pasteParse() {
    wx.getClipboardData({
      success: (res) => {
        this.setData({
          value: res.data,
        });
        this.oSubmit();
      },
      fail: (e) => {
        console.log(e);
      },
      complete: () => {
        this.setData({
          disabled: false,
          pasteParseLoading: false,
        });
        console.log("停止转圈和disabled");
      },
    });
  },
  parse() {
    this.oSubmit();
  },
});
