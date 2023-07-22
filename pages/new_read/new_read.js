var touchDotx = 0; //触摸时的原点
var touchDoty = 0;
var touchMove = 0;
var time = 0; // 时间记录，用于滑动时且时间小于1s则执行左右滑动 
var interval = ""; // 记录/清理时间记录 
var scrollW = '';
var clientW = '';
var clientY = '';
var novelId = 0;
var chapterId = 0;
var page = 1; // 目录分页
var lastPage = {}; // 上一章数据
var _this = '';
var readPage = {}; // 当前阅读页面
var fromMark = true;
var closeScreenKeepOnTime = 300;
var timer = null;

Page({
  data: {
    content: '',
    initFontSize: '20',
    cname: '',
    colorArr: [{ value: '#f7eee5', name: '米白', font: '' },
    { value: '#e9dfc7', name: '纸张', font: '', id: "font_normal" },
    { value: '#a4a4a4', name: '浅灰', font: '' },
    { value: '#cdefce', name: '护眼', font: '' },
    { value: '#283548', name: '灰蓝', font: '#7685a2', bottomcolor: '#fff' },
    { value: '#0f1410', name: '夜间', font: '#4e534f', bottomcolor: 'rgba(255,255,255,0.7)', id: "font_night" }
    ],
    nav: 'none',
    ziti: 'none',
    _num: 1,
    bodyColor: '#e9dfc7',
    daynight: false,
    zj: 'none',
    tx: 0,
    tx_menu: 100,
    mask_show: 'none',
    tx_time: '0',
    totalPage: 0,
    currentPage: 0,
    chap_list: [],
    totalChap: 0,
    orderBy: 'asc',
    scroll_top: 0
  },
  onLoad: function (options) {
    page = 1;
    // 本地提取字号大小
    var that = this;
    _this = this;
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
    readPage = wx.getStorageSync('readPage') || {};
    wx.getSystemInfo({
      success: function (res) {
        clientW = res.screenWidth;
        clientY = res.screenHeight;
      }
    });


    novelId = options.novel_id;
    chapterId = options.chapter_id;

    this.getContent(novelId, chapterId);  
  },
  onUnload: function() {
    wx.setKeepScreenOn({
      keepScreenOn: false
    })
    clearInterval(timer);
    timer = null;
  },
  onShow: function() {
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    closeScreenKeepOnTime = 300;
    this.screenKeepOnCountDown();
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
      initFontSize: FontSize += 2
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
        nav: 'flex'
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
      this.countTotalPage('pre');
      this.setData({
        tx: this.data.tx + 100,
        currentPage: this.data.currentPage - 1
      })
    }

  },
  //下一页
  nextPage: function () {
    if (this.data.currentPage >= this.data.totalPage) {
      lastPage.chapterId =  chapterId;
      lastPage.totalPage =  this.data.totalPage;
      chapterId++;
      this.getContent(novelId, chapterId);
    } else {
      this.countTotalPage('next');
      this.setData({
        tx: this.data.tx - 100,
        currentPage: this.data.currentPage + 1
      })
    }

    // 预加载
    if (this.data.currentPage >= this.data.totalPage / 2 && this.data.totalPage != 0) {
      let pre_chap = parseInt(chapterId) + 1;
      if (!wx.getStorageSync('n_' + novelId + '_' + pre_chap)) {
        this.getContent(novelId, pre_chap, true);
      }
    }
  },
  // 触摸开始事件
  touchStart: function (e) {
    closeScreenKeepOnTime = 300;
    this.screenKeepOnCountDown();
    touchDotx = e.touches[0].pageX; // 获取触摸时的原点
    touchDoty = e.touches[0].pageY; // 获取触摸时的原点
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
    if (touchMove === 0) { //纯点击事件
      //点击中心区域
      if (touchDotx > clientW / 3 && touchDotx < clientW / 3 * 2 && touchDoty > clientY / 3 && touchDoty < clientY / 3 * 2) {
        this.midaction();
      }
      if (touchDotx > clientW / 3 * 2 || (touchDotx > clientW / 4 * 1 && touchDoty > clientY / 3 * 2)) {
        this.nextPage();
      }
      if (touchDotx < clientW / 3 || (touchDotx < clientW / 4 * 1 && touchDoty < clientY / 3 * 2)) {
        this.lastPage();
      }
    } else {
      // 向左滑动
      if (touchMove - touchDotx <= -40 && time < 10) {
        this.nextPage();
      }
      // 向右滑动
      if (touchMove - touchDotx >= 40 && time < 10) {
        this.lastPage();
      }
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
  },
  getContent: function (nid, cid, preLoad = false) {
    var n_key = 'n_' + nid + '_' + cid;
    let res = wx.getStorageSync(n_key);
    if (res) {
      this.parseNovelData(res);
      return;
    }
    var header = {};
    var _this = this;
    if (preLoad == false) { // 不是预加载请求加header
      var token = wx.getStorageSync('token') || '';
      header = {
        'content-type': 'application/json',
        'token': token
      }
      wx.showLoading({
        title: '加载中',
      })
    }
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
        wx.hideLoading();
        if (res.data.code == 1) {
          if(preLoad === false){
            _this.parseNovelData(res.data.data);
          }
          wx.setStorageSync(n_key, res.data.data)
          // 存储所有小说key,作过期用
          let keys = wx.getStorageSync('keys') || [];
          let obj = {
            k: n_key,
            t: Date.parse(new Date()) / 1000
          }
          keys.push(obj);
          wx.setStorageSync('keys', keys)
          _this.storageExpire();
        } else {
          preLoad === false && wx.showModal({
            title: '请求错误',
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function (res) {
        preLoad === false && wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
      },
    })
  },
  //处理小说文本内容
  parseNovelData(data) {
    var _this = this;
    var content = data.chapter.content;
    content = content.replace(/<p>/g, '&emsp;&emsp;');
    content = content.replace(/<\/p>/g, '\n');
    content = content.replace(/&nbsp;&nbsp;&nbsp;&nbsp;|;&nbsp;&nbsp;&nbsp;|;&nbsp;&nbsp;/g, '');
    content = content.replace(/&nbsp;/g, '&emsp;&emsp;');
    content = content.replace(/<br \/>\r\n<br \/>\r\n|<br \/>\n<br \/>\n|<br\/><br\/>|<br \/><br \/>/g, '\n&emsp;&emsp;');
    content = content.replace(/“/g, '"');
    content = content.replace(/”/g, '"');
    // content = ' &emsp;&emsp;' + content;

    let tx = 0;
    let currentPage = 1;
    if(JSON.stringify(lastPage) != '{}' && chapterId == lastPage.chapterId){ // 处理返回上一章，跳回最后页面
      tx = _this.data.tx - 100 * (lastPage.totalPage - 1);
      currentPage = lastPage.totalPage;
      lastPage = {};
    }

    if(fromMark == true && novelId in readPage && readPage[novelId].c_id == chapterId){
      tx = _this.data.tx - 100 * (parseInt(readPage[novelId].page) - 1);
      currentPage =  readPage[novelId].page;
    }

    _this.setData({
      content: content,
      cname: data.chapter.name,
      currentPage: 1,
      totalPage: 0,
      tx: tx,
      totalChap: data.novel.last_chapter_id
    })

    _this.updateMark();
    setTimeout(() => {
      _this.setData({
        tx:tx,
        currentPage: currentPage,
      })
      _this.countTotalPage('init');
    }, 100);
  },
  /**
   * 更新书签
   */
  updateMark: function(){
    wx.request({
      url: 'https://api.ytool.top/api/mark',
      data: {
        novel_id: novelId,
        chapter_id: chapterId
      },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      method: 'PUT',
      dataType: 'json',
      success: function (res) {

      }
    })
  },
  // 目录模块处理
  showChapList: function (e) {
    this.setData({
      nav: 'none',
      ziti: 'none',
      zj: 'none'
    })
    this.setData({
      mask_show: 'block',
      tx_menu: 0,
    })
    if (page == 1) {
      page = Math.ceil(chapterId / 100);
    }
    let order = this.data.orderBy;
    if (this.data.chap_list.length === 0) {
      this.getChapList(page, order);
    }
  },
  //隐藏目录层
  hideMask: function (e) {
    this.setData({
      mask_show: 'none',
      tx_menu: 100
    })
  },
  //获取目录数据
  getChapList: function (page, order) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://api.ytool.top/api/chapter',
      data: {
        novel_id: novelId,
        page: page,
        order: order
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.data.code != 0) {
          let arr = res.data.data;
          let chap_list = arr.map(function (obj) {
            var robj = {};
            robj.cid = obj.order_id
            robj.name = obj.name;
            robj.now = obj.order_id == chapterId ? true : false;
            return robj;
          })
          if (page != 1) { //第一页不拼接数据
            chap_list = [..._this.data.chap_list, ...chap_list]
          } else {
            _this.setData({
              scroll_top: 0
            })
          }
          _this.setData({
            chap_list: chap_list
          })
          setTimeout(() => {
            _this.goCurrentChapter();
          }, 100)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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
  },
  //选择章节阅读
  selectChap: function (e) {
    chapterId = e.currentTarget.dataset.cid;
    this.setData({
      mask_show: 'none',
      tx_menu: 100
    })
    this.getContent(novelId, chapterId);
  },
  //目录排序
  orderDesc: function () {
    let order = this.data.orderBy;
    order = order == 'asc' ? 'desc' : 'asc';
    this.setData({
      orderBy: order
    })
    page = 1;
    this.getChapList(page, order);
  },
  moreChap: function () {
    page++;
    this.getChapList(page, this.data.orderBy);
  },
  //获取总页码，有瑕疵--点太快，transition,没执行完，剩余宽度变多
  countTotalPage: function (from = 'init') {
    var _this = this;
    wx.createSelectorQuery().select('.artical-action-mid').scrollOffset(function (rect) {
      scrollW = rect.scrollWidth; //获取滚动条宽度
      var pages = Math.round(scrollW / clientW);
      if (from == 'next') {
        pages--;
      }
      if (from == 'pre') {
        pages++;
      }
      _this.setData({
        totalPage: pages + _this.data.currentPage - 1,
      })

      //记录当前阅读页面
      readPage[novelId] = {};
      readPage[novelId]['page'] = _this.data.currentPage;
      readPage[novelId]['c_id'] = chapterId;
      wx.setStorageSync('readPage', readPage);
    }).exec()
  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  lastChap: function () {
    chapterId--;
    this.getContent(novelId, chapterId);
  },
  nextChap: function () {
    chapterId++;
    this.getContent(novelId, chapterId);
  },
  /**
   * 缓存过期处理
   */
  storageExpire(){
    let keys = wx.getStorageSync('keys') || [];
    let time = Date.parse(new Date()) / 1000;
    for(let i= keys.length - 3; i >= 0; i--){
      if(time - keys[i].t > 86400){
        let k = keys[i].k
        wx.removeStorage({
          key:k
        })
        keys.splice(i,1);
      }
    }
    wx.setStorageSync('keys', keys)
  },
  screenKeepOnCountDown(){
    if (timer != null) {
      return
    }
    timer = setInterval(() => {
      closeScreenKeepOnTime--;
      if (closeScreenKeepOnTime <= 0) {
        wx.setKeepScreenOn({
          keepScreenOn: false
        })
        clearInterval(timer);
        timer = null;
      }
    }, 1000)
  },
  goCurrentChapter() {
    let currentChap = 0;
    for (let i = 0; i < this.data.chap_list.length; i++) {
      const chap = this.data.chap_list[i];
      if (chap.now == true) {
        currentChap = i;
      }
    }
    let highPercent = currentChap / this.data.chap_list.length;
    setTimeout(() => {
      wx.createSelectorQuery().select('#chap-list').scrollOffset(function (res) {
        let currentPos = res.scrollHeight * highPercent;
        _this.setData({
          scroll_top: currentPos
        })
      }, 100).exec()
    })
  },
})