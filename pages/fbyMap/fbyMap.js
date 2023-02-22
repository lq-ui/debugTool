// pages/fbyMap/fbyMap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locationInfo: '',
    longitude: 121.5826873,
    latitude: 31.199037,
    speed: 0,
    accuracy: 0,
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 31.199037,
      longitude: 121.5826873,
      width: 50,
      height: 50,
      callout: {
        content: "¥ 2290 起",
        bgColor: "#ffffff",
        color: "#000",
        fontSize: 13,
        display: "ALWAYS",
        padding: 10,
        borderRadius: 15
      }
    }]
  },
  //事件处理函数
  bindViewTap: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("生命周期函数--监听页面加载")
    var that = this
    // that.fbyLocation();
    that.openLocation()
  },

  openSetting: function () {
    var that = this
    wx.getSetting({
      success : res => {
        wx.openSetting({
          success: function (res) {
            if (res.authSetting["scope.userLocation"]) {
              console.log("授权成功")
              that.fbyLocation();
            }else {
              console.log("授权失败")
            }
          },
          fail: function (res) {
            console.log("授权失败")
          }
        })
      }
    })
  },

  openLocation: function () {
    wx.chooseLocation({
      success: function (res) {
        console.log('address: ' + JSON.stringify(res))
      },
      fail: function (res) {
        console.log("失败")
        wx.openSetting({
          success: function (res) {
            if (res.authSetting["scope.userLocation"]) {

            }
          },
          fail: function (res) {
            console.log("授权失败")
          }
        })
      }
    })
  },

  fbyLocation: function () {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log("12345经度:" + that.data.longitude + "纬度:" + that.data.latitude)

        var locationString = res.latitude + "," + res.longitude;
        that.requestLocation(locationString);

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })


      },
      //定位失败回调
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '定位失败,请打开权限',
          success(res) {
            if (res.confirm) {
              that.openSetting();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
      }
    })
  },

  requestLocation: function (locationString) {
    var that = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        "key": "4DMBZ-ONVKQ-SVY5B-GGJJZ-JF25K-WGB6F",
        "location": locationString
      },
      method: 'GET',
      success: function (r) {

        //输出一下位置信息
        console.log('用户位置信息', r.data.result.address);
        that.setData({
          locationInfo: r.data.result.address
        })
        //这步是将位置信息保存到本地缓存中，key = value的形式
        // try {
        //   wx.setStorageSync('locationInfo', r.data.result)
        // } catch (e) {
        //   console.log(e)
        // }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    console.log("生命周期函数--监听页面初次渲染完成")
    this.mapCtx = wx.createMapContext('myMap')
    console.log("经度:" + that.data.longitude + "纬度:" + that.data.latitude)
    this.mapCtx.moveToLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("生命周期函数--监听页面显示")

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

    console.log("用户点击右上角分享")

  }
})