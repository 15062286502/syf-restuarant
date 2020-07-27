// pages/mine/mine.js
const app = getApp()
const api = app.globalData.api
Page({
  globalData: {
    socketStatus: 'closed',
  },
  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loginButton: true,
    username: "",
    content:""
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
    that.connect(0)
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

connect:function(type){
  var that = this
  if (that.globalData.socketStatus === 'closed') {
    wx.getUserInfo({
     success: function(res) {
        that.setData({
          username: res.userInfo.nickName
        })
         that.openSocket(res.userInfo.nickName,type);
     }
   })
       
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
            this.connect(1)  
            wx.request({
              url: api+'/vx/saveUser',
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
      url: '../myAddress/myAddress'
    })
  },
  imChat:function(){
    wx.navigateTo({
      url: '../imchat/imchat'
    })
  },
  openSocket: function(username, type) {
    var that = this;
    //打开时的动作
     wx.onSocketOpen(() => {
       console.log('WebSocket 已连接')
       that.globalData.socketStatus = 'connected';
     })
     //断开时的动作
     wx.onSocketClose(() => {
       console.log('WebSocket 已断开')
       that.globalData.socketStatus = 'closed'
     })
     //报错时的动作
     wx.onSocketError(error => {
       console.error('socket error:', error)
     })
     // 监听服务器推送的消息
     wx.onSocketMessage(message => {
       //把JSONStr转为JSON
       message = message.data.replace(" ", "");
       if (typeof message != 'object') {
         message = message.replace(/\ufeff/g, ""); //重点
         var jj = JSON.parse(message);
         message = jj;
       }
       console.log("【websocket监听到消息】内容如下：");
       console.log(message);
       var that = this;
       var msg = ""
       if(message.data!==undefined){
         msg = message.data.content
       }
       if(message.msg!==undefined){
        msg = message.msg
      }
       that.setData({
       content: msg
       })
       
     })
     // 打开信道

     wx.connectSocket({
       url: "ws://" + "192.168.84.83" + ":8888?username="+username+"&password=2"+"&userid="+wx.getStorageSync('openId')+"&type="+type
     })
   },
     
 //关闭信道
   closeSocket() {
     if (this.globalData.socketStatus === 'connected') {
       wx.closeSocket({
         success: () => {
           this.globalData.socketStatus = 'closed'
         }
       })
     }
   },
     
  //发送消息函数
   sendMessage(username,to,message) {
     if (this.globalData.socketStatus === 'connected') {
     //自定义的发给后台识别的参数

        var msg = {};
        msg.from= username
        msg.to = to
        msg.cmd=11
        msg.chatType = 2
        msg.group_id = 100
        msg.content = message
        var send = JSON.stringify(msg);
       wx.sendSocketMessage({
         data: send 
       })
     }
   },
   formSubmit: function(e) {
    var form = e.detail.value
    this.sendMessage(this.data.username,form.name,form.message)
  }

})