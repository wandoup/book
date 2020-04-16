// pages/details/details.js
var novelId;
var aname;
var chapterId;
var header;
Page({

  /**
   * 页面的初始数据
   */

  data: {
    img:[],
    name:[],
    author:[],
    introduction:['这个作者太懒了，没有介绍'],
    bookid: [],
    chapter_id: [],
  },

  gotoread:function(){
    let jname = JSON.stringify(aname);
    let jnovelid = JSON.stringify(novelId);
    let jchapterid = JSON.stringify(chapterId);
    wx.navigateTo({
      url: '../read/read?novel_id=' + jnovelid + '&chapter_id=' + jchapterid + '&name=' + jname
    })
  },
  
  gotocatalog:function(e){
    let id = e.currentTarget.dataset.bookid;
    let jid = JSON.stringify(id);
    let name = e.currentTarget.dataset.bookname;
    let jname = JSON.stringify(name);
    wx.navigateTo({
      url: '../catalog/catalog?bookid=' + jid + '&bookname=' + jname,
    })
  },

  addbook:function(e){
    let addid = e.currentTarget.dataset.bookaddid;
    console.log(e.currentTarget.dataset.bookaddid)
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
    wx.request({
      url: 'https://api.ytool.top/api/mark',
      data: { novel_id:addid },
      header: header,
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log('加入书架成功')
        console.log(res)
        wx.showToast({
          title: '加入书架成功',
          icon: 'none',
          duration: 3000
        })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var than = this;
    var id = JSON.parse(options.bookid);
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
        wx.request({
          url: 'https://api.ytool.top/api/novel',
          data: { novel_id: id },
          header:header,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log('获取详情成功')
            console.log(res)
            novelId=res.data.data.id;
            aname = res.data.data.name;
            chapterId=res.data.data.channel_id;
              if(res.data.data.intro!=''){
                than.setData({
                  img: res.data.data.cover.replace(/http:/g, 'https:'),
                  name:res.data.data.name,
                  author:res.data.data.author.name,
                  introduction:res.data.data.intro,
                  bookid:res.data.data.id,
                  chapter_id:res.data.data.channel_id,
                })
              }else{
                than.setData({
                  img: res.data.data.cover.replace(/http:/g, 'https:'),
                  name: res.data.data.name,
                  bookid: res.data.data.id,
                  chapter_id: res.data.data.channel_id,
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