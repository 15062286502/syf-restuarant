// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginButton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              that.setData({
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl,
                loginButton: false
              })
            }
          })

        }
      }
    })
  },
  bitphone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail)
    var that = this;
    that.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl,
      loginButton: false
    })
  }
 

 
})