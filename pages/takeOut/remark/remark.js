// pages/takeOut/remark/remark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStars: [
      "../../../images/star.jpg",
      "../../../images/star.jpg",
      "../../../images/star.jpg",
      "../../../images/star.jpg",
      "../../../images/star.jpg",
    ],
    userEmoji: [
      "../../../images/good.jpg",
      "../../../images/bad.jpg",
      "../../../images/normal.jpg",
    ]
  },
  starTap: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = "../../../images/redStar.jpg";
        that.setData({
          wjxScore: i + 1,
        })

      } else { // 其他是空心
        tempUserStars[i] = "../../../images/star.jpg"

      }

    }
    // 重新赋值就可以显示了
    that.setData({
      userStars: tempUserStars

    })

  },
  emoji: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var temp = this.data.userEmoji;
    switch (index) {
      case 0:
        temp = ["../../../images/goodChecked.jpg",
          "../../../images/bad.jpg",
          "../../../images/normal.jpg",
        ];
        break;
      case 1:
        temp = [
          "../../../images/good.jpg",
          "../../../images/badChecked.jpg",
          "../../../images/normal.jpg"
        ];
        break;
      case 2:
        temp = [
          "../../../images/good.jpg",
          "../../../images/bad.jpg",
          "../../../images/normalChecked.jpg"
        ];
        break;
    }
    that.setData({
      userEmoji: temp

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '订单评价'
    })
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