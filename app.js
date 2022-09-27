import { colorUI } from "./config/ColorUI";
import { colorUISdk } from "./config/mp-sdk";

App({
  colorUI, //挂载到app上
  colorUISdk,
  globalData: { unionid: null },
  onLaunch() {
    wx.cloud.init({ env: "yf-tools-5gwumn3lb5ba64bc" });
    wx.cloud
      .callFunction({ name: "getWXContext" })
      .then((res) => {
        console.log(res);
        this.globalData.unionid = res.result.unionid;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  onShow() {},
});
