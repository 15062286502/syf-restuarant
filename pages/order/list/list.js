// pages/order/list/list.js
const app = getApp()
const api = app.globalData.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    takeInList: [],
    takeOutList: [],
    state: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  changeTab: function(e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })
    if (index == 1) {
      var that = this;
      wx.request({
        url: api + '/vx/getAllTakeOutOrder',
        method: 'GET',
        data: {
          "openId": wx.getStorageSync('openId')
        },
        header: {
          'Accept': 'application/json'
        },
        success: function(res) {
          
          that.setData({
            takeOutList: res.data
          })
          
        },
        fail: function(res) {
          wx.showToast({
            title: '服务器异常',
            icon: 'none'
          })
        }
      })
    }
  },
  golist: function() {
    if (this.data.tabIndex == 0) {
      wx.navigateTo({
        url: '../../list/list'
      })
    } else {
      wx.navigateTo({
        url: '../../takeOut/takeOut'
      })
    }


  },
  onShow: function() {
    var that = this;
    wx.request({
      url: api + '/vx/takeInOrder',
      method: 'GET',
      data: {
        "openId": wx.getStorageSync('openId')
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        that.setData({
          takeInList: res.data
        })

      },
      fail: function(res) {
        wx.showToast({
          title: '服务器异常',
          icon: 'none'
        })
      }
    })
  },
  goDetail: function(e) {
    var that =this
    var index = e.currentTarget.dataset.index;
    
    if (this.data.tabIndex == 0) {
      wx.setStorageSync("detail", this.data.takeInList[index])
      wx.navigateTo({
        url: '../inDetail/inDetail'
      })
    } else {
      wx.setStorageSync("detail", this.data.takeOutList[index])
      wx.navigateTo({
        url: '../outDetail/outDetail'
      })
    }
  }

})