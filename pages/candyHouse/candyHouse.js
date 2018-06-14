// pages/candyHouse/candyHouse.js
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
          candyList : res.data
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

  getCandy: function (e){

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
        var title = "领取成功！";
        
        if(res.data.code == 101){
            title = "已经领取过！";
        }

        if(res.data.code == 102){
            title = "本次活动糖果已发完";

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