// pages/applist/applist.js
Page({
  /**
   * 页面的初始数据
   */
  data: { appList: [] },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "getAppList",
        // 传给云函数的参数
        data: {
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
});
