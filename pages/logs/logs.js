// pages/logs/logs.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    logsList: [],
    currentPage: 0, // 当前第几页,0代表第一页
    pageSize: 10, //每页显示多少数据
    loadMore: false, //"上拉加载"的变量，默认false，隐藏
    loadAll: false, //“没有数据”的变量，默认false，隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // let app = getApp();
    // console.log(app.globalData.unionid);
    // const db = wx.cloud.database();
    // db.collection("remove_logo_logs")
    //   .where({
    //     unionid: app.globalData.unionid,
    //   })
    //   .get()
    //   .then((res) => {
    //     console.log(res);
    //     this.setData({ logsList: res.data });
    //   })
    //   .catch(console.error());
    this.getData();
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

  //访问网络,请求数据
  getData() {
    let that = this;
    //第一次加载数据
    if (this.currentPage == 1) {
      this.setData({
        loadMore: true, //把"上拉加载"的变量设为true，显示
        loadAll: false, //把“没有数据”设为false，隐藏
      });
    }
    console.log("more", this.data.loadMore);
    let app = getApp();
    //云数据的请求
    wx.cloud
      .database()
      .collection("remove_logo_logs")
      .where({
        unionid: app.globalData.unionid,
      })
      .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
      .limit(that.data.pageSize)
      .orderBy("timestamp", "desc")
      .get()
      .then((res) => {
        console.log("请求成功", res);
        if (res.data && res.data.length > 0) {
          let currentPage = that.data.currentPage;
          currentPage++;
          that.setData({ currentPage: currentPage });
          //把新请求到的数据添加到logsList里
          let list = that.data.logsList.concat(res.data);
          let result = [];
          let obj = {};
          const appImgUlr = {
            阳光宽频:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-365yg.png",
            抖音:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-douyin.png",
            度小视:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-duxiaoshi.png",
            快手:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-gitShow.png",
            绿洲:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-lvzhou.png",
            美拍:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-meipai.png",
            秒拍:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-miaopai.png",
            微视:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-microview.png",
            全民K歌:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-music.png",
            皮皮虾:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-ppx.png",
            今日头条:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-toutiao.png",
            火山:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-volcano.png",
            西瓜视频:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-watermelon.png",
            微博:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-weibo.png",
            小咖秀:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-xiaokaxiu.png",
            最右:
              "cloud://yf-tools-5gwumn3lb5ba64bc.7966-yf-tools-5gwumn3lb5ba64bc-1306633415/static/app-logo/logo-zuiyou.png",
          };
          for (let i of list) {
            if (!obj[i]) {
              i.timestamp = that.formatDate(i.timestamp);
              i.src = appImgUlr[i.appName];
              result.push(i);
              obj[i.videoText] = 1;
            }
          }
          console.log(result);
          that.setData({
            logsList: result, //获取数据数组
            loadMore: false, //把"上拉加载"的变量设为false，显示
          });
          if (res.data.length < that.data.pageSize) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true, //所有数据都加载完了
            });
          }
        } else {
          that.setData({
            loadAll: true, //把“没有数据”设为true，显示
            loadMore: false, //把"上拉加载"的变量设为false，隐藏
          });
        }
      })
      .catch((res) => {
        console.log("请求失败", res);
        that.setData({
          loadAll: false,
          loadMore: false,
        });
      });
  },
  empty() {
    let app = getApp();
    Dialog.confirm({
      title: "确认清空吗？",
      message: "历史记录清空后不可恢复，确认清空历史记录吗？",
    })
      .then(() => {
        // on confirm
        wx.cloud
          .callFunction({
            name: "clearAllLogs",
            data: { unionid: app.globalData.unionid },
          })
          .then((res) => {
            console.log(res.result);
          })
          .catch(console.error());
      })
      .catch(() => {
        // on cancel
      });
    // this.$showDialog({
    //   title: "确认清空",
    //   content: "历史记录清空后不可恢复，确认清空历史记录吗？",
    //   success: (res) => {
    //     console.log(res);
    //     if (res.confirm) {
    //       this.$success({
    //         title: "点击了确定",
    //       });
    //       wx.removeStorage({
    //         key: "videoLogs",
    //         success(res) {
    //           console.log(res);
    //         },
    //       });
    //     }
    //   },
    // });
  },
  copyStr(event) {
    wx.setClipboardData({
      data: event.currentTarget.dataset.msg,
    });
  },
  reParse(event) {
    this.setData({
      value: event.currentTarget.dataset.msg,
    });
    this.oSubmit();
    this.getData();
  },
});
