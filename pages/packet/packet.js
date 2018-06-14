// pages/packet/packet.js
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
      url: 'https://xme01.7cto.com/candy/getUserAccount',
      data: {
        user_id: user_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          account: res.data
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
  onShareAppMessage: function (res) {

    let that = this;
    var user_id = wx.getStorageSync('user_id');
    var packetNo = Date.parse(new Date())+user_id;
    

    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: that.data.asset_code,
        path: `/pages/prize/prize?packetNo=${packetNo}`,
        success: function (res) {
          var user_id = wx.getStorageSync('user_id');
          wx.request({
            url: 'https://xme01.7cto.com/candy/packet',
            data: {
              user_id: user_id,
              asset_code: that.data.asset_code,
              total: that.data.total, 
              num: that.data.num,
              packetNo: packetNo,
              userName: app.globalData.userInfo.nickName
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
            }
          })
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
  },
  radioChange: function (e) {
    let that = this;

    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: 'https://xme01.7cto.com/candy/getUserAccountBalance',
      data: {
        user_id: user_id,
        asset_code: e.detail.value
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          balance: res.data.balance
        })
      }
    })

    that.setData({
      "asset_code": e.detail.value
    })

    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  bindTotalBlur: function (e) {

    let that = this
    that.setData({
      total: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindNumBlur: function (e) {

    let that = this
    that.setData({
      num: e.detail.value
    })
    console.log(e.detail.value)
  }

})