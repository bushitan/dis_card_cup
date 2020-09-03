// v2 版本 先享卡操作

var LOCATION_MAIN = 1   // 头部背景图
var LOCATION_PRODUCT = 2 // 门店名称下的轮播图
var LOCATION_MENU = 3  // 底部广告
var LOCATION_SELF = 4  
var LOCATION_OTHER = 5  
var app = getApp()
module.exports = Behavior({
    data: {
        bannerBGList: [], ///images/swiper6.jpg
        bannerProductList:[], 
    },
    ready() {
        console.log('babber ', )
        // this.onInitCoupon()
        this.bannerGetBG()
    },

    methods: {
      
        async bannerGetBG() {
            var res = await await app.db.storeGetBannerList({
                ShopId: this.data.shop_id,
                Location: LOCATION_MAIN,
            })
            this.setData({ bannerBGList: res.data.SliderItems })

            var res = await await app.db.storeGetBannerList({
                ShopId: this.data.shop_id,
                Location: LOCATION_MAIN,
            })
            this.setData({ bannerProductList: res.data.SliderItems })
        },


    },

       // 直接填写token
            // var prepare_card_token = "AASP3pABAAABAAAAAADHNIWw2QhMoeXY7lpHXyAAAAADtnyy0EE9i6Uvi-0YMCGm9-uJj5q8_pVCQ3En7ZqEcbh-3Xe48izRyn5qRPlcVlFELzf3BzS6gmq8amviUmdBrhJcsvVecAz5BK4y4lbTKIqLcBWqIDM_sgyuR-zyzLxSIuMcAoRFNoYp"


  // // // 跳转小程序领取先享卡
            // wx.navigateToMiniProgram({
            //     appId: "wxcc2e4fbc5887661e",
            //     path: "/pages/get-card/get-card?prepare_card_token=" + prepare_card_token,
            //     extraData: {
            //     }
            // })




    
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     console.log("attached")
    // },

    
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})