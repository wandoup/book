// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[
      {
        img:'../../images/AAA.jpg',
        name:'1'},
      {
        img: '../../images/AAA.jpg',
        name: '2'
      }, {
        img: '../../images/AAA.jpg',
        name: '3'
      }, {
        img: '../../images/AAA.jpg',
        name: '4'
      }, {
        img: '../../images/AAA.jpg',
        name: '5'
      }, {
        img: '../../images/AAA.jpg',
        name: '6'
      }, {
        img: '../../images/AAA.jpg',
        name: '7'
      },{
        img: '../../images/AAA.jpg',
        name: '8'
      },{
        img: '../../images/AAA.jpg',
        name: '9'
      },{
        img: '../../images/AAA.jpg',
        name: '10'
      }
    ],

  },
  
  gotoBookCity: function () {
    wx.switchTab({
      url: '../BookCity/BookCity'
    })
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