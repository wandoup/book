// pages/read/read.js
var id;
var novelidSave;
var num;
var header;
var height=60;
var size=30;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:{
      name:'',
      title:null,
      content: null
      },
    isShow:"display:none",
    fontsize:"line-height:60rpx;font-size:30rpx;",
    menuShow: false,
    night:false,
  },

  menushow:function(){
    // var menuShow = this.data.menuShow
    this.setData({
      menuShow: !this.data.menuShow
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },

  night:function(){
    this.setData({
      night: !this.data.night
    })
  },
  
  gotoup:function(){
    var than = this;
    num--;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
        wx.request({
          url: 'https://api.ytool.top/api/content?novel_id=7168&chapter_id=1',
          data: { novel_id: novelidSave, chapter_id: id + num },
          header: header,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(num)
            console.log('访问成功')
            console.log(res)
            var content = res.data.data.chapter.content;
            content = content.replace(/<p>/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            content = content.replace(/<\/p>/g, '\n');
            content = content.replace(/<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n'); 
            content = content.replace(/“/g, '"');
            content = content.replace(/”/g, '"');
            than.setData({
              ['book.title']: res.data.data.chapter.name,
              ['book.content']: content,
              isShow: "display:block"
            })
            // 页面置顶
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
          complete: function (res) {
            wx.hideLoading();
          },
        })
      }
    })
  },

  gotodown:function(){
    var than = this;
    num++;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
        wx.request({
          url: 'https://api.ytool.top/api/content?novel_id=7168&chapter_id=1',
          data: { novel_id: novelidSave, chapter_id: id + num },
          header: header,
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(num)
            console.log('访问成功')
            console.log(res)
            var content = res.data.data.chapter.content;
            content = content.replace(/<p>/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
            content = content.replace(/<\/p>/g, '\n');
            content = content.replace(/<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n');
            content = content.replace(/“/g, '"');
            content = content.replace(/”/g, '"');
            than.setData({
              ['book.title']: res.data.data.chapter.name,
              ['book.content']: content,
              isShow: "display:block"
            })
            // 页面置顶
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
          complete: function (res) {
            wx.hideLoading();
          },
        })
      }
    })
  },

  gotocatalog: function (e) {
    let jid = JSON.stringify(novelidSave);
    let name = e.currentTarget.dataset.bookname;
    let jname = JSON.stringify(name);
    wx.navigateTo({
      url: '../catalog/catalog?bookid=' + jid + '&bookname=' + jname,
    })
  },

  fontdown:function () {
    size=size-2;
    height=height-4;
    this.setData({
      fontsize:'line-height:'+ height +'rpx;font-size:'+ size +'rpx;'
    })
    wx.setStorage({
      key: 'size',
      data: size,
    })
    wx.setStorage({
      key: 'height',
      data: height,
    })
    console.log(size)
    console.log(height)
  },

  fontup: function () {
    size = size + 2;
    height = height + 4;
    this.setData({
      fontsize: 'line-height:' + height + 'rpx;font-size:' + size + 'rpx;'
    })
    wx.setStorage({
      key: 'size',
      data: size,
    })
    wx.setStorage({
      key: 'height',
      data: height,
    })
    console.log(size)
    console.log(height)
  },

  going:function(){
    console.log(121)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var novelId = JSON.parse(options.novel_id);
    var chapterId = JSON.parse(options.chapter_id);
    var aname = JSON.parse(options.name);
    var than=this;
    var windowHeight = wx.getSystemInfoSync().windowHeight;
    num=0;
    novelidSave = novelId;
    console.log(windowHeight)
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.getStorage({
      key: 'size',
      success: function (res) {
        size=res.data
        console.log(size)
      }
    })
    wx.getStorage({
      key: 'height',
      success: function (res) {
        height = res.data
        console.log(height)
      }
    })
    than.setData({
      fontsize: 'line-height:' + height + 'rpx;font-size:' + size + 'rpx;'
    })
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
    wx.request({
      url: 'https://api.ytool.top/api/content?novel_id=7168&chapter_id=1',
      data: { novel_id: novelId, chapter_id: chapterId},
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if(res.data.code==0){
          console.log('获取数据失败')
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 3000
          })
        }else{
        console.log('访问成功')
        console.log(res)
        id = res.data.data.chapter.order_id;
        var content = res.data.data.chapter.content;
        content = content.replace(/<p>/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        content = content.replace(/<\/p>/g, '\n');
        content = content.replace(/<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n');
        content = content.replace(/“/g, '"');
        content = content.replace(/”/g, '"');
          than.setData({
            ['book.name']: aname,
            ['book.title']: res.data.data.chapter.name,
            ['book.content']: content,
            isShow:"display:block"
          })
      } 
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {
        wx.hideLoading();
       },
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
    var than=this;
    num++;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        header = {
          'content-type': 'application/json',
          'token': res.data
        }
    wx.request({
      url: 'https://api.ytool.top/api/content?novel_id=7168&chapter_id=1',
      data: { novel_id: novelidSave, chapter_id: id + num},
      header: header,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code == 0) {
          console.log('获取数据失败')
          console.log(res)
          num--
        }else{
          console.log(num)
          console.log('访问成功')
          console.log(res)
          var content = res.data.data.chapter.content;
          content = content.replace(/<p>/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          content = content.replace(/<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n');
          content = content.replace(/<\/p>/g, '\n');
          // console.log(than)
          than.setData({
            ['book.title']: res.data.data.chapter.name, 
            // ['book.content']:content,
            ['book.content']: than.data.book.content.concat(content),
            isShow: "display:block"
          })
        }
        // 页面置顶
        // if (wx.pageScrollTo) {
        //   wx.pageScrollTo({
        //     scrollTop: 0
        //   })
        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: '当前微信版本过低，请升级到最新微信版本后重试。'
        //   })
        // }
      },
      fail: function (res) {
        console.log('失败')
      },
      complete: function (res) {
        wx.hideLoading();
      },
    })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})