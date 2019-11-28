// pages/myAddress/addAddress/addAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  formSubmit: function(e) {
    var address = e.detail.value
    if (this.isEmpty(address.detail) || this.isEmpty(address.number) || this.isEmpty(address.person) || this.isEmpty(address.phone)) {
      wx.showToast({
        title: '请填写完整',
        icon: 'none'
      })
    }else{
      wx.request({
        url: 'http://localhost:8081/vx/saveAddress',
        method: 'GET',
        data: {
          address: e.detail.value,
          openId: wx.getStorageSync("openId")
        },
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          wx.redirectTo({
            url: '../myAddress'
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none'
          })
        }
      })
    }
    
  },
  //判断字符是否为空的方法
  isEmpty: function(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
      return true;
    } else {
      return false;
    }
  }
})