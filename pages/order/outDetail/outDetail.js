// pages/order/inDetail/inDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    cartList: [],
    address: [],
    star: [],
    emoji: '',
    writtenWords: '',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var originalRemark = wx.getStorageSync("detail").orderEntity.evaluate
    if (originalRemark != null && originalRemark!=""){
      var remark = JSON.parse(wx.getStorageSync("detail").orderEntity.evaluate)
      var starNum = parseInt(remark.startNum)
      var emojiNum = parseInt(remark.emojiNum)
      var emojiArray
      var starArray = []
      switch (emojiNum) {
        case 0:
          emojiArray = '../../../images/goodChecked.jpg'
          break;
        case 1:
          emojiArray = '../../../images/badChecked.jpg'
          break;
        case 2:
          emojiArray = '../../../images/normalChecked.jpg'
          break;
      }
      for (var i = 0; i <= starNum; i++) {
        starArray[i] = '../../../images/redStar.jpg'
      }
      this.setData({
        emoji: emojiArray,
        writtenWords: remark.writtenWords,
        star: starArray,
        show:true
      })

    }
   

        this.setData({
          detail: wx.getStorageSync("detail"),
          cartList: JSON.parse(wx.getStorageSync("detail").orderEntity.orderDesc),
          address: JSON.parse(wx.getStorageSync("detail").orderEntity.address)
         
        })


 
    console.log(this.data.detail)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})