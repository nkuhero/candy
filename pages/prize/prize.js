// pages/prize/prize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: 'https://xme01.7cto.com/candy/getUserPacket',
      data: {
        user_id: user_id,
        packetNo: options.packetNo
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          prize: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getPacket: function (e) {

    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: 'https://xme01.7cto.com/candy/getPacket',
      data: {
        user_id: user_id,
        userName: app.globalData.userInfo.nickName,
        packetNo: e.target.dataset.packetNo,
        asset_code: e.target.dataset.assetCode
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        var title = "领取成功！";

        if (res.data.code == 105) {
          title = "红包已领光";
        }

        if (res.data.code == 106) {
          title = "不可重复领取";
        }

        wx.showToast({
          title: title,
          icon: 'succes',
          duration: 1000,
          mask: true
        })
      }
    })


  }
})