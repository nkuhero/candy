// pages/deposit/deposit.js
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
  onShareAppMessage: function () {
  
  },
  deposit : function() {
    let that = this;
    var user_id = wx.getStorageSync('user_id');
    wx.request({
      url: 'https://xme01.7cto.com/candy/deposit',
      data: {
        user_id: user_id,
        asset_code: that.data.asset_code,
        total: that.data.total,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var title = "服务异常";
        if (res.data.code == 200) {
          title = "提现申请成功";
        }

        if (res.data.code == 109) {
          title = "余额不足";
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

  bindTotalInput: function (e) {

    let that = this
    that.setData({
      total: e.detail.value
    })
    console.log(e.detail.value)
  }
})