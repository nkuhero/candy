//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let that = this
    wx.request({
      url: 'https://xme01.7cto.com/candy/getCandyList',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          candyList: res.data
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  candyHouse: function(e){
    wx.navigateTo({
      url: "../candyHouse/candyHouse"
    })
  },
  asset: function (e) {
    wx.navigateTo({
      url: "../asset/asset"
    })
  },
  getCandy: function (e) {

    var activity_id = e.target.dataset.activityId;
    var user_id = wx.getStorageSync('user_id')
    wx.request({
      url: 'https://xme01.7cto.com/candy/getCandy',
      data: {
        user_id: user_id,
        activity_id: activity_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        var title = "服务异常";
        if (res.data.code == 200) {
          title = "领取成功";
        }
        
        if (res.data.code == 101) {
          title = "不可重复领取！";
        }

        if (res.data.code == 102) {
          title = "糖果已发完";
        }

        wx.showToast({
          title: title,
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })


  },
  onShareAppMessage: function (res) {
    let that = this;
    var packetNo = Date.parse(new Date())
    var activity_id = res.target.dataset.activityId;
    var user_id = wx.getStorageSync('user_id');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: "糖果分享",
        path: `/pages/share/share?activity_id=${activity_id}&share_user_id=${user_id}`,
        success: function (res) {
          console.log('转发成功');
        },
        fail: function (res) {
          console.log('转发失败');
        }
      }
    }
    return {
      title: 'candyHouse',
      path: '/pages/index/index'
    }
  }
})
