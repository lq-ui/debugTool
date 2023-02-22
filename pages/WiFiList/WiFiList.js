// pages/WiFiList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist: [],
  },

  startWifi: function () {
    // console.log("已走");
    var that = this;
    // app.showModal1("已走");
    wx.startWifi({
      success: function (res) {
        // console.log(res.errMsg);
        // app.showModal1(res.errMsg);
        wx.getWifiList({
          success: function (res) {
            // console.log(res.errMsg);
            wx.onGetWifiList(function (CALLBACK) {
              var foundWifilist = that.data.showlist;
              foundWifilist = CALLBACK.wifiList;
              that.setData({
                showlist: foundWifilist
              })
              console.log("foundWifilist" + JSON.stringify(foundWifilist));
            });
            
          }
        });
      }
    });
  },

  onStartWifi: function () {
    
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