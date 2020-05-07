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
    // var adList = [
    //     {
    //         url: "http://img.12xiong.top/coffee_image/upload/34NYt6fZ.jpg",
    //         type: 2,

    //         imageUrl: "",

    //         contentUrl: "https://mp.weixin.qq.com/s/oq0Wx4at731NnEiH-s0T5w",

    //         liteAppID: "",
    //         litePath: "",
    //         liteExtraData: "",
    //         liteEnvVersion: "",

    //         roomID: "",
    //     },
    // ]
    getAd(){
        var that = this

        var res = db.adGetList().then(res=>{
            var data = res.data
            var adList = res.data
            that.adList = adList

            var current = getCurrentPages()[0]
            if (current) {
                current.setData({
                    adList: adList
                })

            }
            // console.log(data)
        })
       
       
        setTimeout(function () {

            var current = getCurrentPages()[0]
            current.setData({
                adList: adList
            })
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