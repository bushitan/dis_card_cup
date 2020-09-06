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
       
       
        // setTimeout(function () {

        //     var current = getCurrentPages()[0]
        //     current.setData({
        //         adList: adList
        //     })
        // }, 3000)
    },

    adList: [
    ],

    globalData: {
        userInfo: null
    },

    /**
     * @method 
     * @param 
     *  page
     *  store_id 
     *  is_message : true普通分享 | false 朋友圈分享
     */
    getShareInfo(page,is_message){

        var path = "/pages/route/route?shop_id=" + page.data.store.Id
        if (page.data.isHasDiscountCard)
            path = "/pages/route/route?shop_id=" + page.data.store.Id
                + "&card_id=" + page.data.userDiscountCard.card_id
                + "&user_id=" + wx.getStorageSync(this.db.KEY_SN)

        console.log(
            {
                title: page.data.store.Name,
                path: path,
                imageUrl: page.data.store.Logo,
            }
        )

        // 没有领取先享卡，分享门店名字，领取了，分享先享卡的活动名字
        var title = page.data.store.Name
        if (page.data.userDiscountCard)
            title = page.data.userDiscountCard.name 

        var imageUrl = page.data.store.Logo


        if (is_message) //普通分享
            return {
                title: title,
                path: path,
                imageUrl: imageUrl,
            }
        else //朋友圈分享
            return {
                title: title,
                query: path,
                imageUrl: imageUrl,
            }
    },
})

// 07c160

// "window": {
    // "backgroundTextStyle": "light",
        // "backgroundColor": "#ffffff",
            // "navigationBarBackgroundColor": "#07c160",
                // "navigationBarTitleText": "小杯子先享卡",
                    // "navigationBarTextStyle": "black"
// },