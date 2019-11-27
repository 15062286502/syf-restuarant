// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginButton: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
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
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      var that = this;
      that.setData({
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        loginButton: false
      })
      this.login()

    }

  },

  login: function() {
    wx.login({
      success: res => {
        // 获取到用户的 code 之后：res.code
        // 可以传给后台，再经过解析获取用户的 openid
        // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：

        wx.request({
          // 自行补上自己的 APPID 和 SECRET
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1a5373c8189be987&secret=ec51c8de76a4d2c66b735697dcf82e10&js_code=' + res.code + '&grant_type=authorization_code',
          success: res => {
            // 获取到用户的 openid
            app.setLoginState(res.data.openid)
            wx.request({
              url: 'http://localhost:8081/vx/saveUser',
              method: 'GET',
              data: {
                vxName: this.data.nickName,
                vxImg: this.data.avatarUrl,
                openId: res.data.openid
              },
              header: {
                'Accept': 'application/json'
              },
              success: function (res) {
              },
              fail: function (res) {
                wx.showToast({
                  title: '服务器异常',
                  icon: 'none'
                })
              }
            })

          }
        });
      }
    })
  },
  getAddress:function(){
    wx.navigateTo({
      url: '../address/address'
    })
  }


})