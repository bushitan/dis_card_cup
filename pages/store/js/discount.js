// v2 版本 先享卡操作

var utils = require('../../../utils/util.js')
var app = getApp()
var interval
module.exports = Behavior({
    data: {
        // showCouponListDialog: false, // 对话框
        // showCouponGetDialog: false, // 对话框
        // couponContent: "", // 领取优惠券点结果
        // couponList: [],//我在当前门店的优惠券列表
        // stockList:[],
        countdown:"",//倒计时
    },
    ready() {
        console.log( 'discount interval')
        // this.onInitCoupon()
        var that = this
        var interval = setInterval(function(){
            var now = utils.formatTime( new Date() )
            var countdown = utils.countdownYMDhms(now, that.data.userDiscountCard.end_time)
            that.setData({ countdown:countdown})
        },1000)      
    },
    detached() {
        clearInterval(interval)
        console.log("detached")
    },

    methods: {
        onLoad(options) {
            debugger
            console.log("discount onload", options)

        },

        /**
         * 点击其他用户的分享链接
         */
        async getShare(options) { 
            console.log(options)            
        
            var res = await app.db.wxDiscountCardGetShare({
                storeId: options.shop_id || "",
                card_id_num: options.card_id || "",
                shareSN: options.user_id || "",
            })
            wx.showModal({
                title: res.msg,
                // content: '',
            })

            this.checkUserDiscountCard() //检测用户是否有先享卡 
        },

        /**
         * v2 服务商模式先享卡初始化
         */
        async getDicountCardV2(e) {
            var discount_card_id = e.currentTarget.dataset.discount_card_id

            // 获取先享卡预授权的prepare_card_token
            var res = await app.db.wxDiscountCardPrepareCardToken({
                card_template_id: discount_card_id,    // card_template_id: "20200811184307oaWFh41qk272598831",
            })

            var prepare_card_token = res.data.prepare_card_token         

            // 跳转小程序领取先享卡
            wx.navigateToMiniProgram({
                appId: "wxcc2e4fbc5887661e",
                path: "/pages/get-card/get-card?prepare_card_token=" + prepare_card_token,
                extraData: {
                }
            })
        },

         /**
         * v2 查阅先享卡领取详情
         */
        lookDicountCardDetailV2(){
            wx.navigateToMiniProgram({
                appId: "wxcc2e4fbc5887661e",
                path: "/pages/card-detail/card-detail?card_id=" + this.data.userDiscountCard.card_id,
                success(res) {
                    console.log("success", res)
                },
                fail(res) {
                    console.log("fail", res)
                },
            })
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