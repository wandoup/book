// pages/catalog/catalog.js
var num;
var id;
var cata;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookname:[],
    catalog:[
      {
        name:'',
        novleid:'',
        chapterid:'',
      }
    ]
  },

  gotoread:function(e){
    var than = this;
    let novelId = e.currentTarget.dataset.novelid;
    let aname = e.currentTarget.dataset.name;
    let chapterId = e.currentTarget.dataset.chapterid;
    console.log(novelId)
    let jname = JSON.stringify(aname);
    let jnovelid = JSON.stringify(novelId);
    let jchapterid = JSON.stringify(chapterId);
    wx.navigateTo({
      url: '../read/read?novel_id=' + jnovelid + '&chapter_id=' + jchapterid + '&name=' + jname
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var than=this;
    var eid = JSON.parse(options.bookid);
    var name = JSON.parse(options.bookname);
    id=eid;
    num=0;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var token = wx.getStorageSync('token');
    var header = {};
    if (token) {
      header = {
        'content-type': 'application/json',
        'token': token
      }
    }
    wx.request({
      url: 'https://api.ytool.top/api/chapter',
      data: { novel_id: id },
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取目录成功')
        console.log(res)
        than.setData({
          bookname:name,
        })
        if(res.data.data.length>100){
          for (var i = 0; i < 100; i++) {
            // console.log(res.data.data[i].name)
            than.setData({
              ['catalog[' + i + '].name']:res.data.data[i].name,
              ['catalog[' + i + '].chapterid']: res.data.data[i].order_id,
              ['catalog[' + i + '].novelid']: res.data.data[i].novel_id,
            })
          }
          cata = res.data.data;
        }else{
          for (var i = 0; i < res.data.data.length; i++) {
            // console.log(res.data.data[i].name)
            than.setData({
              ['catalog[' + i + '].name']: res.data.data[i].name,
              ['catalog[' + i + '].chapterid']: res.data.data[i].id,
              ['catalog[' + i + '].novelid']: res.data.data[i].novel_id,
            })
          }
        }
        num=than.data.catalog.length;
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {
        wx.hideLoading();
      },
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
    // var than = this;
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    // wx.request({
    //   url: 'https://api.ytool.top/api/chapter',
    //   data: { novel_id: id },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: function (res) {
    //     console.log('获取目录成功')
    //     console.log(res)
    //     if (res.data.data.length-num > 100){
    //       for (var i = num; i < num+100; i++) {
    //         // console.log(res.data.data[i].name)
    //         than.setData({
    //           ['catalog[' + i + '].name']: res.data.data[i].name,
    //         })
    //       }
    //     }else{
    //       for (var i = num; i <res.data.data.length; i++) {
    //         // console.log(res.data.data[i].name)
    //         than.setData({
    //           ['catalog[' + i + '].name']: res.data.data[i].name,
    //         })
    //       }
    //     }
    //     num = than.data.catalog.length;
    //   },
    //   fail: function (res) {
    //     console.log('失败')
    //   },
    //   complete: function (res) { 
    //     wx.hideLoading();
    //    },
    // })


    var than = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    if (cata.length - num > 100) {
          for (var i = num; i < num+100; i++) {
            // console.log(res.data.data[i].name)
            than.setData({
              ['catalog[' + i + '].name']: cata[i].name,
            })
          }
        }else{
      for (var i = num; i < cata.length; i++) {
            // console.log(res.data.data[i].name)
            than.setData({
              ['catalog[' + i + '].name']: cata[i].name,
            })
          }
        }
        num = than.data.catalog.length;
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})