// pages/imchat/imchat.js
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
    username: "",
    content:"",
    openId: wx.getStorageSync('openId')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that =this
    if (that.globalData.socketStatus === 'closed') {
      var that = this;
      wx.getUserInfo({
       success: function(res) {
          that.setData({
            username: res.userInfo.nickName
          })
           that.openSocket(res.userInfo.nickName);
       }
     })
         
    }
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
  openSocket: function(username) {
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
       url: "ws://" + "192.168.84.83" + ":8888?username="+username+"&password='2'"+"&userid="+wx.getStorageSync('openId')
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