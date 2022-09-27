//框架核心配置
import ColorUI from "../mp-cu/main";
export const colorUI = new ColorUI({
  config: {
    theme: "auto",
    main: "blue",
    text: 1,
    footer: false,
    share: true,
    shareTitle: "雨非工具",
    homePath: "/pages/home/home",
    tabBar: [
      {
        title: "首页",
        icon: "/static/tab_icon/home.png",
        curIcon: "/static/tab_icon/home_cur.png",
        url: "/pages/home/home",
        type: "tab",
      },
      {
        title: "历史记录",
        icon: "/static/tab_icon/logs.png",
        curIcon: "/static/tab_icon/logs_cur.png",
        url: "/pages/logs/logs",
        type: "tab",
      },
    ],
  },
  data: {
    apiUrl: "https://mp-api.oltools.net",
  },
  methods: {
    formatDate(value) {
      var date = new Date(value);
      var y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = date.getHours(),
        i = date.getMinutes(),
        s = date.getSeconds();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      if (h < 10) {
        h = "0" + h;
      }
      if (i < 10) {
        i = "0" + i;
      }
      if (s < 10) {
        s = "0" + s;
      }
      var t = y + "年" + m + "月" + d + "日 " + h + ":" + i + ":" + s;
      return t;
    },
    copyUrl(msg) {
      let data;
      switch (msg) {
        case "video":
          data = this.data.videoUrl;
          break;
        case "image":
          data = this.data.imageUrl[0];
          break;
        case "desc":
          data = this.data.videoInfo.desc;
          break;
        default:
          break;
      }
      wx.setClipboardData({
        data: data,
      })
        .then(
          wx.showToast({
            title: "已复制到剪贴板",
            icon: "success",
          })
        )
        .catch(
          wx.showToast({
            title: "复制失败",
            icon: "error",
          })
        );
    },
    pastes() {
      wx.getClipboardData()
        .then((res) => {
          this.setData({
            value: res.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    replaceReg: function (t) {
      let a = /(http:\/\/|https:\/\/)((\w|=|:|\?|\.|\/|&|-)+)/g;
      return t.replace(a, (t) => {
        this.setData({
          videoUrl: t,
        });
      });
    },
    regUrl: function (t) {
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
        t
      );
    },
    saveToStorage: function (t) {
      wx.getStorage({
        key: "videoLogs",
        success: function (res) {
          console.log(res.data);
          var arr = res.data;
          if (arr.includes(t)) {
            arr.splice(arr.indexOf(t), 1), arr.unshift(t);
            wx.setStorage({
              key: "videoLogs",
              data: arr,
            });
          } else if (arr.length < 100) {
            arr.unshift(t);
            wx.setStorage({
              key: "videoLogs",
              data: arr,
            });
          } else {
            arr.unshift(t),
              arr.pop(),
              wx.setStorage({
                key: "videoLogs",
                data: arr,
                success() {
                  console.log(arr);
                },
              });
          }
        },
        fail() {
          wx.setStorage({
            key: "videoLogs",
            data: [t],
            success(res) {
              console.log(res);
            },
          });
        },
      });
    },
    oSubmit: function () {
      var a = this;
      this.replaceReg(a.data.value);
      if (a.data.videoUrl && a.regUrl(a.data.videoUrl)) {
        wx.showLoading({
          title: "正在解析视频",
          mask: true,
        });
        wx.cloud
          .callContainer({
            config: {
              env: "prod-3g053jsx715e5206",
            },
            path: "/v1/wx/video-info",
            data: {
              url: a.data.videoUrl,
            },
            header: {
              "X-WX-SERVICE": "yfqsy",
            },
          })
          .then((t) => {
            if (t.data.code == 0) {
              console.log(t.data.data);
              let app = getApp();
              const db = wx.cloud.database();
              const _ = db.command;
              db.collection("remove_logo_logs")
                .where(
                  // _.and({
                  //   unionid: app.globalData.unionid,
                  { videoText: a.data.value, unionid: app.globalData.unionid }
                  // })
                )
                .field({ _id: true })
                .get()
                .then((res) => {
                  wx.cloud.init({ env: "yf-tools-5gwumn3lb5ba64bc" });
                  if (res.data.length > 0) {
                    wx.cloud
                      .callFunction({
                        name: "updateTimestamp",
                        data: { _id: res.data[0]._id },
                      })
                      .then((res) => {
                        console.log("我成功了", res);
                      })
                      .catch((err) => {
                        console.error("我的错", err);
                      });
                    // console.log("resid",res);
                    // db.collection("remove_logo_logs")
                    //   .where({
                    //     _id: res.data[0]._id,
                    //   })
                    //   .update({ data: { timestamp: Date.parse(new Date()) } })
                    //   .then((res) => {
                    //     if (res.stats.updated>0) {
                    //       console.log("更新成功");
                    //     }
                    //     console.log(res);
                    //   });
                  } else {
                    db.collection("remove_logo_logs")
                      .add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                          unionid: app.globalData.unionid,
                          videoText: a.data.value,
                          timestamp: Date.parse(new Date()),
                          appName: t.data.data.app_name,
                        },
                      })
                      .then((res) => {
                        console.log(res);
                      })
                      .catch(console.error);
                  }
                })
                .catch(console.error);

              wx.hideLoading();
              wx.showToast("解析成功", "success");
              wx.navigateTo({
                url: "/pages/video/videoInfo/videoInfo",
              })
                .then((next) => {
                  next.eventChannel.emit("videoInfo", {
                    data: t.data.data,
                  });
                })
                .catch((e) => {
                  wx.hideLoading();
                  wx.showToast("解析失败", "error");
                  console.log(e);
                });
            } else {
              a.showToast("解析失败");
            }
          });
      } else {
        wx.showToast("请复制视频链接");
      }
    },
  },
});
