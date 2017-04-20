//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    src: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
  },
  canvers: function () {
    wx.chooseImage({
      success: function (res) {
        const ctx = wx.createCanvasContext('myCanvas')

        ctx.drawImage(res.tempFilePaths[0], 0, 0, 200, 200)
       ctx.draw() 
        ctx.drawImage('card.png', 190, 190, 30, 30)
        ctx.draw(true) 
      }
    })
  },
  save: function () {
    let self = this
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.previewImage({
          current: res.tempFilePath, // 当前显示图片的http链接
          urls: [res.tempFilePath] // 需要预览的图片http链接列表
        })
      }
    })
  }
})
