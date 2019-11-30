// pages/takeOut/balanceOut/balanceOut.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData: [],
    index: 0,
    cartList: [],
    sumMonney: 0,
    cupNumber: 0,
    remarks: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cupNumber: wx.getStorageSync('cupNumber'),
      openId: wx.getStorageSync('openId')
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
      url: api + '/vx/getAddress',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openId")
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          addressData: res.data
        })
        wx.setStorageSync("address", res.data)
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  },

  gopay: function(){
    var that =this;
    wx.request({
      url: api + '/vx/takeOutOrder',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openId"),
        'cartList': that.data.cartList,
        'sumMoney': that.data.sumMonney,
        'cupNumber': that.data.cupNumber,
        'remarks': that.data.remarks,
        'openId': that.data.openId,
        'address': that.data.addressData[0][that.data.index]
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.redirectTo({
          url: '../takeOutDetail/takeOutDetail?identifier=' + res.data.identifier + '&time=' + res.data.time + '&mealNumber=' + res.data.deliveryPerson
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  },

  remark: function (e) {
    this.setData({
      remarks: e.detail.value
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
  select: function(){
    wx.navigateTo({
      url: '../address/address'
    })
  }
})