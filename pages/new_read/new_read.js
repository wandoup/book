var touchDot = 0; //触摸时的原点 
var touchMove = 0;
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var scrollW = '';
var clientW = '';
var novelId = 0;
var chapterId = 0;
var aname = '';
Page({
  data: {
    content: '',
    initFontSize: '14',
    cname: '',
    colorArr: [{
      value: '#f7eee5',
      name: '米白',
      font: ''
    }, {
      value: '#e9dfc7',
      name: '纸张',
      font: '',
      id: "font_normal"
    }, {
      value: '#a4a4a4',
      name: '浅灰',
      font: ''
    }, {
      value: '#cdefce',
      name: '护眼',
      font: ''
    }, {
      value: '#283548',
      name: '灰蓝',
      font: '#7685a2',
      bottomcolor: '#fff'
    }, {
      value: '#0f1410',
      name: '夜间',
      font: '#4e534f',
      bottomcolor: 'rgba(255,255,255,0.7)',
      id: "font_night"
    }],
    nav: 'none',
    ziti: 'none',
    _num: 1,
    bodyColor: '#e9dfc7',
    daynight: false,
    zj: 'none',
    tx: 0,
    tx_time: '0.5',
    totalPage: 0,
    currentPage: 0
  },
  onLoad: function (options) {
    // 本地提取字号大小
    var that = this;
    wx.getStorage({
      key: 'initFontSize',
      success: function (res) {
        that.setData({
          initFontSize: res.data
        })
      }
    })
    //存储背景色
    wx.getStorage({
      key: 'bodyColor',
      success: function (res) {
        that.setData({
          bodyColor: res.data
        })
      }
    })
    wx.getStorage({
      key: '_num',
      success: function (res) {
        that.setData({
          _num: res.data
        })
      }
    })
    wx.getStorage({
      key: 'daynight',
      success: function (res) {
        that.setData({
          daynight: res.data
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        clientW = res.screenWidth;
      }
    });

    novelId = options.novel_id;
    chapterId = options.chapter_id;
    aname = options.name;

    this.getContent(novelId, chapterId);
  },
  //事件处理函数
  //字体变大
  bindBig: function () {
    var that = this;
    if (that.data.initFontSize > 30) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize += 1
    })
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  //字体变小
  bindSmall: function () {
    var that = this;
    if (that.data.initFontSize < 12) {
      return;
    }
    var FontSize = parseInt(that.data.initFontSize)
    that.setData({
      initFontSize: FontSize -= 1
    })
    wx.setStorage({
      key: "initFontSize",
      data: that.data.initFontSize
    })
  },
  //点击中间区域显示底部导航
  midaction: function (e) {
    if (this.data.nav == 'none') {
      this.setData({
        nav: 'block'
      })
    } else {
      this.setData({
        nav: 'none',
        ziti: 'none'
      })
    }
  },
  //点击字体出现窗口
  zitiaction: function () {
    if (this.data.ziti == 'none') {
      this.setData({
        ziti: 'block'
      })
    } else {
      this.setData({
        ziti: 'none'
      })
    }
  },
  //选择背景色
  bgChange: function (e) {
    this.setData({
      _num: e.target.dataset.num,
      bodyColor: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "bodyColor",
      data: this.data.colorArr[e.target.dataset.num].value
    })
    wx.setStorage({
      key: "_num",
      data: e.target.dataset.num
    })
  },
  //切换白天夜晚
  dayNight: function () {
    if (this.data.daynight == true) {
      this.setData({
        daynight: false,
        bodyColor: '#e9dfc7',
        _num: 1
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#e9dfc7'
      })
      wx.setStorage({
        key: "_num",
        data: 1
      })

    } else {
      this.setData({
        daynight: true,
        bodyColor: '#000',
        _num: 5
      })
      wx.setStorage({
        key: "bodyColor",
        data: '#000'
      })
      wx.setStorage({
        key: "_num",
        data: 5
      })
    }
    wx.setStorage({
      key: "daynight",
      data: this.data.daynight
    })
  },
  //上一页
  lastPage: function () {
    if (this.data.tx >= 0) {
      chapterId--;
      if (chapterId <= 0) {
        wx.showToast({
          title: '已是第一章',
          icon: 'none'
        })
        return;
      }
      this.getContent(novelId, chapterId);
    } else {
      this.setData({
        tx: this.data.tx + 750,
        currentPage: this.data.currentPage - 1
      })
    }

  },
  //下一页
  nextPage: function () {
    this.countTotalPage();
    if (this.data.currentPage >= this.data.totalPage) {
      chapterId++;
      this.getContent(novelId, chapterId);
    } else {
      this.setData({
        tx: this.data.tx - 750,
        currentPage: this.data.currentPage + 1
      })
    }
  },
  // 触摸开始事件 
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);
    touchMove = 0;
  },
  // 触摸移动事件 
  touchMove: function (e) {
    this.setData({
      nav: 'none',
      ziti: 'none',
      zj: 'none'
    })
    touchMove = e.touches[0].pageX;
  },
  // 触摸结束事件 
  touchEnd: function (e) {
    console.log(touchDot);
    console.log(touchMove);
    console.log(clientW/2);
    // 向左滑动 
    if ((touchMove != 0 && touchMove - touchDot <= -40 && time < 10) || (touchMove == 0 && touchDot > clientW/2)) {
      console.log('next');
      this.nextPage();
    }
    // 向右滑动 
    if ((touchMove - touchDot >= 40 && time < 10) || (touchMove == 0 && touchDot < clientW/2)) {
      console.log('last');
      this.lastPage();
    }
    clearInterval(interval); // 清除setInterval 
    time = 0;
  },
  getContent: function (nid, cid, preLoad = false) {
    var header = {};
    var _this = this;
    if (preLoad == false) { // 不是预加载请求加header
      var token = wx.getStorageSync('token');
      if (token) {
        header = {
          'content-type': 'application/json',
          'token': token
        }
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.ytool.top/api/content',
      data: {
        novel_id: nid,
        chapter_id: cid
      },
      header: header,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx.hideLoading({
          success: (res) => {},
        })
        if (res.data.code == 1) {
          var content = res.data.data.chapter.content;
          content = content.replace(/<p>/g, '&emsp;&emsp;');
          content = content.replace(/<\/p>/g, '\n');
          content = content.replace(/&nbsp;&nbsp;&nbsp;&nbsp;|;&nbsp;&nbsp;&nbsp;|;&nbsp;&nbsp;/g, '');
          content = content.replace(/&nbsp;/g, '&emsp;&emsp;');
          content = content.replace(/<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n&emsp;&emsp;');
          content = content.replace(/“/g, '"');
          content = content.replace(/”/g, '"');
          content = ' &emsp;&emsp;' + content;
          _this.setData({
            tx_time: 0,
            content: content,
            cname: res.data.data.chapter.name,
            currentPage: 0,
            totalPage: 0,
            tx: 0
          })
          setTimeout(() => {
            _this.setData({
              currentPage: 1,
              tx_time: 0.5,
            })
            _this.countTotalPage();
          }, 100);
        } else {
          wx.showModal({
            title: '请求错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
      },
    })
  },
  //获取总页码，有瑕疵-总宽度异常
  countTotalPage: function () {
    var _this = this;
    wx.createSelectorQuery().select('.artical-action-mid').scrollOffset(function (rect) {
      console.log(rect)
      scrollW = rect.scrollWidth; //获取滚动条宽度
      var pages = Math.floor(scrollW / clientW);
      _this.setData({
        totalPage: pages + _this.data.currentPage - 1,
      })
    }).exec()
  }
})