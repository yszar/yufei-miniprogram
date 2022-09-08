// pages/video/video.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    videoInfo: {},
    videoUrl: "",
    imageUrl: "",
    desc: "",
    progress: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptDataFromOpenerPage", function (data) {
      console.log("上页");
      console.log(data);
      that.setData({
        videoInfo: data.data,
        videoUrl: data.data.video,
        imageUrl: data.data.cover[0],
        desc: data.data.desc,
      });
      console.log(that.data.videoUrl);
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
  onUnload() {
    const eventChannel = this.getOpenerEventChannel();
    // 移除监听事件
    eventChannel.off("acceptDataFromOpenerPage");
  },

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
  tabChange(e) {
    console.log(e);
    this.setData({
      current: e.detail.index,
    });
  },
  copy(event) {
    console.log(event);
    this.copyUrl(event.currentTarget.dataset.msg);
  },
  save(event) {
    var t = this;
    var msg = event.currentTarget.dataset.msg;
    wx.getSetting({
      success: function (o) {
        if (o.authSetting["scope.writePhotosAlbum"]) {
          t.download(msg);
        } else {
          wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function () {
              t.download(msg);
            },
            fail: function (o) {
              wx.showModal({
                title: "提示",
                content: "保存到相册需获取相册权限,请允许开启权限",
                confirmText: "确认",
                cancelText: "取消",
                success: function (o) {
                  if (o.confirm) {
                    wx.openSetting({
                      success: function (o) {},
                    });
                  } else {
                    ("");
                  }
                },
              });
            },
          });
        }
      },
    });
  },
  download(msg) {
    // this.session();
    if (msg == "video") {
      var url = encodeURIComponent(this.data.videoUrl);
      var fileType = ".mp4";
    }
    if (msg == "image") {
      var url = encodeURIComponent(this.data.imageUrl);
      var fileType = ".jpg";
    }
    // const sessionidValue = wx.getStorageSync('sessionid');
    let timeStr = new Date().getTime();
    let filePath = wx.env.USER_DATA_PATH + "/" + timeStr + fileType;
    const downloadTask = wx.downloadFile({
      url:
        this.data.$cuData.apiUrl +
        "/v1/wx/video-image-file?url=" +
        url +
        "&type_str=" +
        fileType,
      filePath: filePath,
      success: (res) => {
        if (res.statusCode === 200 && msg == "video") {
          wx.showToast({
            title: "连接正确",
            icon: "success",
          });
          console.log(res);
          wx.saveVideoToPhotosAlbum({
            filePath: filePath,
            success: function () {
              wx.showToast({
                title: "保存成功",
                icon: "success",
              });
              this.percent = 0;
            },
            fail: function (e) {
              console.log(e);
              wx.showToast({
                title: "保存失败，请稍后重试",
                icon: "none",
              });
            },
          });
        }
        if (res.statusCode === 200 && msg == "image") {
          wx.showToast({
            title: "连接正确",
            icon: "success",
          });
          console.log(res);
          wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: function () {
              wx.showToast({
                title: "保存成功",
                icon: "success",
              });
              this.percent = 0;
            },
            fail: function (e) {
              console.log(e);
              wx.showToast({
                title: "保存失败，请稍后重试",
                icon: "none",
              });
            },
          });
        }
      },
      fail: (e) => {
        console.log(e);
      },
    });

    downloadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress,
      });
      console.log("下载进度" + res.progress);
      console.log("已经下载的数据长度" + res.totalBytesWritten);
      console.log("预期需要下载的数据总长度" + res.totalBytesExpectedToWrite);
    });
  },
  showToast: function (o) {
    var t =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "none",
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500;
    wx.showToast({
      title: o,
      icon: t,
      duration: n,
    });
  },
});
