// pages/order/balance/balance.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber:0,
    remarks: "",
    openId: ""
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
      cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
      cupNumber: wx.getStorageSync('cupNumber'),
      openId: wx.getStorageSync('openId')
    })
    
  },
  gopay:function(){
    var that =this;
    
    wx.request({
      url: api+'/vx/getOrder',
      method: 'GET',
      data: {
        'cartList': that.data.cartList,
        'sumMoney': that.data.sumMonney,
        'cutMoney': that.data.cutMonney,
        'cupNumber': that.data.cupNumber,
        'remarks': that.data.remarks,
        'openId': that.data.openId
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.redirectTo({
          url: '../detail/detail?identifier=' + res.data.identifier + '&time=' + res.data.time +'&mealNumber=' + res.data.mealNumber
        })
      },
      fail: function(res){
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })

  
  },
  remark: function(e){
    this.setData({
      remarks: e.detail.value
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
  
  }
})