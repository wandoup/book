// pages/books/books.js
var geto = require('../common/common.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[
         {
           img:null,
           aname:null
         },
      // {
      //   img:'../../images/AAA.jpg',
      //   name:'1'},
      // {
      //   img: '../../images/AAA.jpg',
      //   name: '2'
      // }, {
      //   img: '../../images/AAA.jpg',
      //   name: '3'
      // }, {
      //   img: '../../images/AAA.jpg',
      //   name: '4'
      // }, {
      //   img: '../../images/AAA.jpg',
      //   name: '5'
      // }, {
      //   img: '../../images/AAA.jpg',
      //   name: '6'
      // }, {
      //   img: '../../images/AAA.jpg',
      //   name: '7'
      // },{
      //   img: '../../images/AAA.jpg',
      //   name: '8'
      // },{
      //   img: '../../images/AAA.jpg',
      //   name: '9'
      // },{
      //   img: '../../images/AAA.jpg',
      //   name: '10'
      // }
    ],

  },

  gotoBookCity: function () {
    wx.switchTab({
      url: '../BookCity/BookCity'
    })
  },

  gotodetails:function(){
    geto.gotodetails();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var than=this;
      wx.request({
      url: 'https://m.ytool.top/user/markcp/index',
      data: {user_id:1},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('访问成功')
        for(var i=0;i<res.data.length;i++){
          // var iimg="books["+ index +"].img";
          // than.data.books.img.push(res.data[i].novel.cover)
          than.setData({
            ['books[' + i + '].img']: res.data[i].novel.cover,
            ['books[' + i + '].aname']: res.data[i].novel.name
          })
        }
      },
      fail: function(res) {
        console.log('失败')
      },
      complete: function(res) {},
    })
    
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