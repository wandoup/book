// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information:[
      {
        src:"../../images/time.png",
        text:"阅读历史",
        name:"history"
      },
      {
        src: "../../images/star.png",
        text: "我的收藏",
        name: "collection"
      }
    ]

  },
  gotocollection:function(event){
    var e = event.currentTarget.dataset.listname;
    wx.navigateTo({
      url: `../${e}/${e}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
              wx.login({
                success: res => {
                  console.log(res)
                  if (res.code) {
                    wx.request({
                      url: 'https://api.ytool.top/api/login',
                      data: { code: res.code },
                      method: 'GET',
                      dataType: 'json',
                      responseType: 'text',
                      success: function (res) {
                        console.log(res)
                        if (res.data.code == 1) {
                          wx.setStorage({
                            key: 'token',
                            data: res.data.data.token,
                          })
                          if(res.data.data.chk){
                            wx.setStorage({
                              key: 'chk',
                              data: 1,
                            })
                          }else{
                            wx.setStorage({
                              key: 'chk',
                              data: 0,
                            })
                          }
                          console.log('登录成功')
                          wx.showToast({
                            title: '登录成功',
                            icon: 'none',
                            duration: 3000
                          })
                        } else {
                          wx.showToast({
                            title: '登录失败',
                            icon: 'none',
                            duration: 3000
                          })
                        }
                      },
                      fail: function (res) { },
                      complete: function (res) { },
                    })
                  }
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