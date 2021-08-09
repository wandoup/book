//app.js
App({
  globalData:{
    token: '',
    userInfo: null,
    cod: null,
  },
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 缓存处理
    wx.getStorageInfo({
      success (res) {
        if(res.currentSize > res.limitSize * 0.8){
          wx.clearStorageSync()
        }
      }
    })

  },
  // 监听token属性
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "token", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._token = value;
        method(value);
      },
      get: function () {
        return this._token
      }
    })
  },
  // 登录
  getToken:function (fun = null, force = false) {
    var that = this;
    let token = wx.getStorageSync('token');
    if(token !== '' && force === false) {
      if(typeof fun == "function"){
        fun(token);
      }
    }else{
      wx.login({
        success: res => {
          if (res.code) {
            wx.request({
              url: 'https://api.ytool.top/api/login',
              data: {
                code: res.code
              },
              method: 'GET',
              dataType: 'json',
              responseType: 'text',
              success: function (res) {
                if (res.data.code == 1) {
                  wx.setStorage({
                    key: 'token',
                    data: res.data.data.token,
                  })
                  //设置全局token
                  that.globalData.token = res.data.data.token;
                  token = res.data.data.token;
                  if(typeof fun == "function"){
                    fun(token);
                  }
                } else {
                  wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                    duration: 3000
                  })
                }
                //过审核用
                let chk = 0;
                if (res.data.data.chk) {
                  chk = 1;
                }
                wx.setStorage({
                  key: 'chk',
                  data: chk,
                })
              },
              fail: function (res) {
                wx.showToast({
                  title: '登录失败',
                  icon: 'none',
                  duration: 3000
                })
              },
              complete: function (res) { },
            })
          }
        }
      })
    }
  }

})