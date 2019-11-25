// pages/order/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8081/vx/takeInOrder',
      method: 'GET',
      data: {
        "openId": wx.getStorageSync('openId')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  },

  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })
  },
  golist: function () {
    wx.navigateTo({
      url: '../../list/list'
    })
  },
})