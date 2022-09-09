// pages/logs/logs.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      logsList: wx.getStorageSync("videoLogs"),
    });
  },

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

  empty() {
    this.$showDialog({
      title: "确认清空",
      content: "历史记录清空后不可恢复，确认清空历史记录吗？",
      success: (res) => {
        console.log(res);
        if (res.confirm) {
          this.$success({
            title: "点击了确定",
          });
          wx.removeStorage({
            key: "videoLogs",
            success(res) {
              console.log(res);
            },
          });
        }
      },
    });
  },
  copyStr(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.msg,
    });
  },
  reParse(event) {
    this.setData({
      disabled: "1",
      value: event.currentTarget.dataset.msg,
    });
    this.oSubmit();
  },
});
