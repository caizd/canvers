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
    let self = this
    let srcUrl = ''
    wx.chooseImage({
      count: 1,
      success: function (res) {
        srcUrl = res.tempFilePaths[0]
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
            let bili = res.height / res.width
            self.setData({
              height: 320*bili
            })
            const ctx = wx.createCanvasContext('myCanvas')
            ctx.drawImage(srcUrl, 0, 0,320)
            ctx.setGlobalAlpha(1)
            ctx.draw()
            setTimeout(function () {
              for (let i = 0; i < 120; i++) {
                ctx.setFillStyle("#ffffff")
                let a = i * i * 0.00003;
                if (a > 0.7) {
                  a = 0.7;
                }
                ctx.setGlobalAlpha(a)
                ctx.arc(150, 450, 120 - i, 0, 2 * Math.PI)
                ctx.fill()
                ctx.draw(true)
              }
              setTimeout(function () {
                wx.downloadFile({
                  url: 'http://se1.clschina.com/files/erweima.png', //仅为示例，并非真实的资源
                  success: function (res) {
                    ctx.setGlobalAlpha(1)

                    ctx.drawImage(res.tempFilePath, 70, 370, 160, 160)
                    ctx.draw(true)
                  }
                })


              }, 200)
            }, 100)

          }
        })




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
