// pages/books/books.js
var geto = require('../common/common.js'); 
var header;
var novelId;
var chapterId;
var aname;
var num;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[
         {
           img:'',
           aname:'',
           novel_id:'',
           chapter_id:''

      }, 
    ],
    isShow:[
      "display: none"
    ],
    delbox:false,

  },
  //获取用户按下的时间
  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },
  //获取用户离开的时间
  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  del:function(e){
    this.setData({
      delbox: true
    })
    novelId = e.currentTarget.dataset.novelid;
  },

  butyes:function(){
    var than = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
        wx.request({
          url: 'https://api.ytool.top/api/mark',
          data: { novel_id: novelId},
          method: 'DELETE',
          dataType: 'json',
          responseType: 'text',
          header: header,
          success: function (res) {
            console.log('移出书架成功')
            than.setData({
              delbox: false
            })
            console.log(than.data.books)
            than.data.books.splice(than.data.books.length-1, 1)
            than.setData({
              books: than.data.books
            })
            than.onShow()
          },
          fail: function (res) {
            console.log('失败')
          },
          complete: function (res) { },
        })
      }
    })
  },

  butno:function(){
    this.setData({
      delbox:false,
    })
  },

  gotoBookCity: function () {
    wx.switchTab({
      url: '../BookCity/BookCity'
    })
  },

  gotoread:function(e){
    var than=this;
    if (than.endTime - than.startTime < 350) {
      console.log("点击")
      novelId=e.currentTarget.dataset.novelid;
      aname=e.currentTarget.dataset.name;
      chapterId = e.currentTarget.dataset.chapterid;
      let jname = JSON.stringify(aname);
      let jnovelid = JSON.stringify(novelId);
      let jchapterid = JSON.stringify(chapterId);
      wx.navigateTo({
        url: '../new_read/new_read?novel_id=' + jnovelid + '&chapter_id=' + jchapterid + '&name=' + jname
      })
    }
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
    var than = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
          header = {
            'content-type': 'application/json',
            'token': res.data
          }
          wx.request({
            url: 'https://api.ytool.top/api/mark',
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            header: header,
            success: function (res) {
              console.log('获取书架成功')
              console.log(res)
              if (res.data.data.length > 0) {
                for (var i = 0; i < res.data.data.length; i++) {
                  than.setData({
                    ['books[' + i + '].img']:
                      res.data.data[i].novel.cover.replace(/http:/g, 'https:'),
                    ['books[' + i + '].aname']:
                      res.data.data[i].novel.name,
                    ['books[' + i + '].novel_id']:
                      res.data.data[i].novel_id,
                    ['books[' + i + '].chapter_id']:
                      res.data.data[i].chapter_id
                  })
                }
                than.setData({
                  isShow: "display: block"
                })
              }
            },
            fail: function (res) {
              console.log('失败')
            },
            complete: function (res) { },
          })
        }
    })
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