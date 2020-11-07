// pages/search/search.js
var geto = require('../common/common.js'); 
var inputvalue;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[
      {
        img: "",
        name: "",
        author: "",
        id:'',
      },
    ],
    isShow: [
      "display: none"
    ]

  },
  
  gotodetails: function () {
    geto.gotodetails();
  },
  
  inputval:function(e){
    inputvalue=e.detail.value
    console.log(inputvalue)
  },

  gotodetails: function (e) {
    let id = e.currentTarget.dataset.bookid;
    let did = JSON.stringify(id);
    wx.navigateTo({
      url: '../details/details?bookid=' + did,
    })
  },

  search:function(){
    wx.showLoading({
      title: '搜索中',
    })
    var than = this;
    wx.request({
      url: 'https://api.ytool.top/api/search?=仙&=2',
      data:{key:inputvalue},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success(res){
        console.log('搜索成功')
        console.log(res)
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            than.setData({
              ['books[' + i + '].img']:
                res.data.data[i].cover,
              ['books[' + i + '].name']:
                res.data.data[i].name,
              ['books[' + i + '].author']:
                res.data.data[i].author.name,
              ['books[' + i + '].id']:
              res.data.data[i].id,
            })
          }
          than.setData({
            isShow: "display: block"
          })
        }
      },
      fail: function (res) {
        console.log('搜索失败')
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading()
      },
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