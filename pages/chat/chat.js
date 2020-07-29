// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
      id: options.id
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var msg = {};
    msg.from= wx.getStorageSync('openId')
    msg.to = this.data.id
    msg.cmd=23
    var send = JSON.stringify(msg);
   wx.sendSocketMessage({
     data: send 
   })
   wx.onSocketMessage(message => {
    //把JSONStr转为JSON
    message = message.data.replace(" ", "");
    if (typeof message != 'object') {
      message = message.replace(/\ufeff/g, ""); //重点
      var jj = JSON.parse(message);
      message = jj;
    }
    if(message.command === 11){
      var msg = {
        speaker: 'server',
        contentType: 'text'
      }
      msg.content = message.data.content
      
      msgList.push(msg)
      inputVal = '';
      this.setData({
        msgList,
        inputVal
      });
      this.blur()
    }
    if(message.command === 24){
      msgList= message.data
      inputVal = '';
      this.setData({
        msgList,
        inputVal
      });
      this.blur()
    }
  })
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
   * 获取聚焦
   */
  focus: function(e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function(e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function(e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
   
      //自定义的发给后台识别的参数
         var msg = {};
         msg.from= wx.getStorageSync('openId')
         msg.to = this.data.id
         msg.cmd=11
         msg.chatType = 2
         msg.group_id = 100
         msg.msgType = 0
         msg.content = e.detail.value
         var send = JSON.stringify(msg);
        wx.sendSocketMessage({
          data: send 
        })
      

  },
  /**
   * 退回上一页
   */
  toBackClick: function() {
    wx.navigateBack({})
  }

})
