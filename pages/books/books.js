// pages/books/books.js
var geto = require('../common/common.js');
const app = getApp()
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
    books: [],
    isShow: [
      "display: none"
    ],
    delbox: false,
    loading:true,
    kfx: 317,
    kfy: 440,
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
            than.setData({
              delbox: false
            })
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

      var jpage = 'new_read';
      wx.getSystemInfo({
        success:function(res){
          if(res.platform == "devtools"){
          }else if(res.platform == "ios"){
            jpage = 'read';
          }else if(res.platform == "android"){
          }
        }
      })
      var isChk = wx.getStorageSync('chk');
      if (isChk == 1) {      
        jpage = 'read_c';
      }
      wx.navigateTo({
        url: '../'+jpage+'/'+jpage+'?novel_id=' + jnovelid + '&chapter_id=' + jchapterid + '&name=' + jname
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.moveEnd();
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
    //监听设置后
    app.getToken(function (user_token) {
      than.getMark(user_token);
    }, false);
  },
  getMark(token){
    var than = this;
    header = {
      'content-type': 'application/json',
      'token': token
    }
    wx.request({
      url: 'https://api.ytool.top/api/mark',
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      header: header,
      success: function (res) {
        if (res.data.code == 1) {
          for (var i = 0; i < res.data.data.length; i++) {
            let row = res.data.data[i];
            let status = '';
            if(row.novel.last_chapter_id){
              if( row.chapter_id == row.novel.last_chapter_id){
                if(row.novel.is_over == 0){
                  status = '已读到最新章';
                }else{
                  status = '已读完';
                }
              }else{
                status = row.novel.last_chapter_id - row.chapter_id + '章未读'
              }
            }
            res.data.data[i].novel && than.setData({
              ['books[' + i + '].img']:
                res.data.data[i].novel.cover.replace(/http:/g, 'https:'),
              ['books[' + i + '].aname']:
                res.data.data[i].novel.name,
              ['books[' + i + '].novel_id']:
                res.data.data[i].novel_id,
              ['books[' + i + '].chapter_id']:
                res.data.data[i].chapter_id,
              ['books[' + i + '].status']:status
            })
          }
          than.setData({
            loading:false,
            isShow: "display: block"
          })
        }
      },
      fail: function (res) {
        console.log(res)
        wx.wx.showToast({
          title: '加载失败',
          icon: 'fail',
          duration: 1500,
          mask: false,
        });
      },
      complete: function (res) {
        if(res.data.code == 401){
          app.getToken(function (user_token) {
            than.getMark(user_token);
          },true);
        }
        wx.hideLoading();
      },
    })
  },


  moveEnd:function (e) {
    var average = 375 / 750 * wx.getSystemInfoSync().windowWidth;
    if(e){
      var xNumLeft = 32 / 750 * wx.getSystemInfoSync().windowWidth;
      var xNumRight = 648 / 750 * wx.getSystemInfoSync().windowWidth;
      var x = e.changedTouches[0].pageX;
      var yNum = e.changedTouches[0].clientY;
    }else{
      yNum = this.data.kfy;
      xNumRight = 648 / 750 * wx.getSystemInfoSync().windowWidth;
      x = 600;
    }
    if (x < average) {
      this.setData({
        kfx: xNumLeft,
        kfy: yNum
      })
    } else {
      this.setData({
        kfx: xNumRight,
        kfy: yNum
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

  }
})