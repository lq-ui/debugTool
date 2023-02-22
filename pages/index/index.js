// pages/index/index.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   //Wi-Fi列表
//   bleClick: function () {
//     wx.navigateTo({
//       url: '/pages/debugBase/debugBase',
//     });
//   },
//   //Wi-Fi列表
//   wifiClick: function () {
//     wx.navigateTo({
//       url: '/pages/WiFiList/WiFiList',
//     });
//   }
// })

var app = getApp()
Page({
  data: {
    userInfo: {},

    parentItem: [
      {
        itemTiele: "调试工具",
        imgUrls: [
          "../../images/wifi.png",
          "../../images/ble.png",
          "../../images/Qrcode.png",
          "../../images/fbyMap.png"
        ],
        texts: [
          "Wi-Fi调试",
          "蓝牙调试",
          "二维码生成",
          "地图调试"
        ]
      }
    ]
  },

  goTools: function (event) {
    var to = event.target.dataset.sel
    var to_str = this.isToUrl[to];
    console.log(to);
    wx.navigateTo({
      url: '../' + to_str + '/' + to_str
    })
  },

  isToUrl: {
    "0-0": "WiFiList",
    "0-1": "debugBase",
    "0-2": "Qrcode",
    "0-3": "fbyMap"
  }

})