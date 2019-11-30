// pages/myAddress/myAddress.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的地址'
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
    var that = this;
    wx.request({
      url: api+'/vx/getAddress',
      method: 'GET',
      data: {
        openId:wx.getStorageSync("openId")
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
       that.setData({
         addressData: res.data
       })
       console.log(that.data.addressData)
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })

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
  addAddress: function(){
    wx.redirectTo({
      url: './addAddress/addAddress'
    })
  },
  deleteAddress: function(e){
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.request({
      url: api+'/vx/deleteAddress',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openId"),
        index: index
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.onShow();
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  }
})