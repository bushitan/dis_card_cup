//app.js
var db = require('db/db.js')
var baseBehavior = require('utils/base-behavior.js')
App({

    
    db: db,
    baseBehavior: baseBehavior,
    onLaunch: function () {

        if (wx.cloud) {
            wx.cloud.init({
                env: "dic-card-cup",
                traceUser: true
            })
        }

        this.getAd()
    },

    // 获取广告数据
    getAd(){
        var that = this
        setTimeout(function () {
            var adList = [
                {
                    url: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",
                    type: "1",

                    imageUrl: "http://img.12xiong.top/coffee_image/upload/psSYv6fZ.jpg",

                    contentUrl: "",

                    liteAppID: "",
                    litePath: "",
                    liteExtraData: "",
                    liteEnvVersion: "",

                    roomID: "",
                },
            ]

            var current = getCurrentPages()[0]
            current.setData({
                adList: adList
            })
            that.adList = adList
        }, 3000)
    },

    adList: [
    ],

    globalData: {
        userInfo: null
    }
})

// 07c160

// "window": {
    // "backgroundTextStyle": "light",
        // "backgroundColor": "#ffffff",
            // "navigationBarBackgroundColor": "#07c160",
                // "navigationBarTitleText": "小杯子先享卡",
                    // "navigationBarTextStyle": "black"
// },