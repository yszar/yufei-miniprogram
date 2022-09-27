// pages/home/home.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toolsList: [
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/removeLogo.png",
        tool_name: "视频去水印",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/copywriting.png",
        tool_name: "文案提取",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/teleprompter.png",
        tool_name: "提词器",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/forbiddenWord.png",
        tool_name: "违禁词检测",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/imageToText.png",
        tool_name: "图片转文字",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/accountValuation.png",
        tool_name: "账号估值",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/dataAnalysis.png",
        tool_name: "数据分析",
      },
      {
        is_show: true,
        tool_img:
          "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/tools-img/dataMonitoring.png",
        tool_name: "数据监控",
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // const db = wx.cloud.database({ env: "yf-tools-5gwumn3lb5ba64bc" });
    // db.collection("index_tools_list")
    //   .where({ is_show: true })
    //   .get()
    //   .then((res) => {
    //     this.setData({ toolsList: res.data });
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  toTool(event: { currentTarget: { id: string } }) {
    switch (event.currentTarget.id) {
      case "视频去水印":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "文案提取":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "提词器":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "违禁词检测":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "图片转文字":
        wx.navigateTo({ url: "/pages/text/imageToText/imageToText" });
        break;
      case "账号估值":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "数据分析":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      case "数据监控":
        wx.navigateTo({ url: "/pages/video/removeLogo/removeLogo" });
        break;
      default:
        break;
    }
  },
});
