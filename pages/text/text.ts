// pages/text/text.ts
Page({
  /**
   * 页面的初始数据
   */
  data: { active: 0, videoUrl: "" },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.once(
      "fromVideoInfo",
      function (data: { data: { action: string; videoUrl: string } }) {
        console.log("上页");
        console.log(data.data);
        that.setData({
          active: data.data.action,
          videoUrl: data.data.videoUrl,
        });
      }
    );
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
  onChange(e: { detail: { index: any } }) {
    this.setData({
      current: e.detail.index,
    });
  },
});
