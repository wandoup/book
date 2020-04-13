// pages/BookCity/BookCity.js
var geto = require('../common/common.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      "玄幻", "奇幻", "武侠", "仙侠", "都市", 
      "现实", "历史", "军事", "游戏", "科幻", "悬疑"
    ],
    books:[
      {
        src:"../../images/C1.jpg",
        name:"垂钓之神",
        author:"会狼叫的猪"
      },
      {
        src: "../../images/C2.jpg",
        name: "第一序列",
        author: "会说话的肘子"
      },{
        src: "../../images/C3.jpg",
        name: "九星毒奶",
        author: "变异"
      },
      {
        src: "../../images/C3.jpg",
        name: "诡异之主",
        author: "爱潜水的乌贼"
      },{
        src: "../../images/C2.jpg",
        name: "斗罗大陆",
        author: "唐家三少"
      },
      {
        src: "../../images/C1.jpg",
        name: "从斗罗开始打卡",
        author: "夏竖琴"
      }, {
        src: "../../images/C3.jpg",
        name: "极品全能高手",
        author: "花都大少"
      },
      {
        src: "../../images/C1.jpg",
        name: "圣墟",
        author: "辰东"
      }
    ]

  },

  gotodetails: function (e) {
    let name = e.currentTarget.dataset.bookname;
    let author = e.currentTarget.dataset.bookauthor;
    let dname = JSON.stringify(name);
    let dauthor = JSON.stringify(author);
    wx.navigateTo({
      url: '../details/details?bookname=' + dname + "&bookauthor=" + dauthor,
    })
    // console.log()
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