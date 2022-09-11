//框架核心配置
import ColorUI from "../mp-cu/main";
export const colorUI = new ColorUI({
  config: {
    theme: "auto",
    main: "blue",
    text: 1,
    footer: false,
    share: true,
    shareTitle: "雨非去水印",
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
    apiUrl: "https://api.oltools.net",
    VideoInfo: {},
    videoUrl: "",
    appList: [
      {
        title: "抖音",
        image: "/static/app-logo/logo-douyin.png",
      },
      {
        title: "快手",
        image: "/static/app-logo/logo-gitShow.png",
      },
      {
        title: "皮皮虾",
        image: "/static/app-logo/logo-ppx.png",
      },
      {
        title: "火山",
        image: "/static/app-logo/logo-volcano.png",
      },
      {
        title: "西瓜",
        image: "/static/app-logo/logo-watermelon.png",
      },
      {
        title: "最右",
        image: "/static/app-logo/logo-zuiyou.png",
      },
      {
        title: "今日头条",
        image: "/static/app-logo/logo-toutiao.png",
      },
      {
        title: "微视",
        image: "/static/app-logo/logo-microview.png",
      },
    ],
  },
  methods: {
    copyUrl(msg) {
      let data;
      switch (msg) {
        case "video":
          data = this.data.videoUrl;
          break;
        case "image":
          data = this.data.imageUrl;
          break;
        case "desc":
          data = this.data.videoInfo.desc;
          break;
        default:
          break;
      }
      wx.setClipboardData({
        data: data,
        success: function () {
          wx.showToast({
            title: "已复制到剪贴板",
            icon: "success",
          });
        },
        fail: function (e) {
          console.log(e);
          wx.showToast({
            title: "复制失败",
            icon: "error",
          });
        },
      });
    },

    pastes() {
      wx.getClipboardData({
        success: (res) => {
          this.setData({
            value: res.data,
          });
        },
        fail: (e) => {
          console.log(e);
        },
      });
    },
    replaceReg: function (t) {
      let a = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
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
      this.setData({
        disabled: true,
        pasteParseLoading: true,
      });
      var a = this;
      this.replaceReg(a.data.value),
        "" != a.data.videoUrl && a.regUrl(a.data.videoUrl)
          ? (wx.showLoading({
              title: "正在解析视频",
            }),
            wx.cloud.callContainer({
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
              success: function (t) {
                wx.hideLoading(),
                  a.setData({
                    disabled: false,
                    pasteParseLoading: false,
                  });
                t.data.code == 0
                  ? (a.showToast("解析成功", "success"),
                    a.saveToStorage(a.data.value),
                    wx.setStorageSync("dataUrl", t.data.data.video),
                    wx.navigateTo({
                      url: "/pages/video/video",
                      success: function (res) {
                        // 通过eventChannel向被打开页面传送数据
                        res.eventChannel.emit("acceptDataFromOpenerPage", {
                          data: t.data.data,
                        });
                      },
                    }))
                  : a.showToast("解析失败"),
                  a.setData({
                    disabled: false,
                    pasteParseLoading: false,
                  });
              },
              fail: function (t) {
                wx.hideLoading(),
                  a.showToast("解析失败"),
                  console.log("fail:失败");
                console.log(t);
              },
            }))
          : a.showToast("请复制视频链接");
    },
    showToast: function (o) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "none",
        n =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1500;
      wx.showToast({
        title: o,
        icon: t,
        duration: n,
      });
    },
  },
});
