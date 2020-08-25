// pages/BookCity/BookCity.js
var geto = require('../common/common.js');
var num = 1;
var id = 3;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      "玄幻", "奇幻", "武侠", "仙侠", "都市",
      "历史", "军事", "游戏", "竞技", "科幻", "灵异", "其他"
    ],
    list2: ['福建', '江西'],
    listcss: '玄幻',
    books: [{
      src: "",
      name: "",
      author: "",
      bookid: "",
    }, ],
    jumpbox: false,

  },

  touch: function (e) {
    console.log(e)
    this.setData({
      listcss: e.currentTarget.dataset.listtitle
    })
    var token = wx.getStorageSync('token');
    var header = {};
    if (token) {
      header = {
        'content-type': 'application/json',
        'token': token
      }
    }
    var than = this;
    id = e.currentTarget.dataset.num;
    wx.request({
      url: 'https://api.ytool.top/api/novellist',
      data: {
        cate_id: id
      },
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取书籍成功')
        console.log(res)
        if (res.data.data.length > 0) {
          than.data.books.splice(0, than.data.books.length)
          than.setData({
            books: than.data.books
          })
          for (var i = 0; i < res.data.data.length; i++) {
            than.setData({
              ['books[' + i + '].src']: res.data.data[i].cover.replace(/http:/g, 'https:'),
              ['books[' + i + '].name']: res.data.data[i].name,
              ['books[' + i + '].author']: res.data.data[i].author.name,
              ['books[' + i + '].bookid']: res.data.data[i].id,
            })
          }
        }
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，请升级到最新微信版本后重试。'
          })
        }
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {},
    })
  },

  gotodetails: function (e) {
    let id = e.currentTarget.dataset.bookid;
    let did = JSON.stringify(id);
    wx.navigateTo({
      url: '../details/details?bookid=' + did,
    })
  },
  butyes: function () {
    var than = this;
    num++
    var token = wx.getStorageSync('token');
    var header = {};
    if (token) {
      header = {
        'content-type': 'application/json',
        'token': token
      }
    }
    wx.request({
      url: 'https://api.ytool.top/api/novellist',
      data: {
        cate_id: id,
        page: num
      },
      method: 'GET',
      header: header,
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code = 1) {
          console.log('获取书籍成功')
          console.log(res)
          if (res.data.data!=null&&res.data.data.length > 0) {
            than.data.books.splice(0, than.data.books.length)
            than.setData({
              books: than.data.books
            })
            for (var i = 0; i < res.data.data.length; i++) {
              than.setData({
                ['books[' + i + '].src']: res.data.data[i].cover.replace(/http:/g, 'https:'),
                ['books[' + i + '].name']: res.data.data[i].name,
                ['books[' + i + '].author']: res.data.data[i].author.name,
                ['books[' + i + '].bookid']: res.data.data[i].id,
              })
            }
            if (wx.pageScrollTo) {
              wx.pageScrollTo({
                scrollTop: 0
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '当前微信版本过低，请升级到最新微信版本后重试。'
              })
            }
          }else {
            wx.showToast({
              title: '此分类下暂无小说',
              icon: 'none',
              duration: 3000
            })
          }
        }
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {
        than.setData({
          jumpbox: false
        })
      },
    })
  },
  butno: function () {
    this.setData({
      jumpbox: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    var than = this;
    var token = wx.getStorageSync('token');
    var header = {};
    if (token) {
      header = {
        'content-type': 'application/json',
        'token': token
      }
    }
    wx.request({
      url: 'https://api.ytool.top/api/novellist',
      data: {
        cate_id: 3,
        page: num
      },
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('获取书籍成功')
        console.log(res)
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            than.setData({
              ['books[' + i + '].src']: res.data.data[i].cover.replace(/http:/g, 'https:'),
              ['books[' + i + '].name']: res.data.data[i].name,
              ['books[' + i + '].author']: res.data.data[i].author.name,
              ['books[' + i + '].bookid']: res.data.data[i].id,
            })
          }
        }
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {},
    })
  },
  initData: function () {
    var isChk = wx.getStorageSync('chk');
    if (isChk == 1) {      
      this.setData({
        list: this.data.list2,
        listcss : this.data.list2[0]
      })
    }
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
    this.setData({
      jumpbox: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})