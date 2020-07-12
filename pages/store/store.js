//index.js
//获取应用实例
var card = require('js/card.js')
var pay = require('js/pay.js')
const app = getApp()

Page({
    data: {

        shop_id:"",
        store:{},
        cardList:[],

        isHasDiscountCard: false,
        userDiscountCard:{},

        showDialog:false , // 对话框
        couponContent:"",
        couponList:[],//我在当前门店的优惠券列表

        // price:0
    },

    behaviors: [app.baseBehavior,card,pay],

    async onLoad(options) {
        this.setData({
            shop_id:options.shop_id || ""
        })

        //领取优惠券
        if (options.hasOwnProperty("stock_id")){
            if (options.stock_id) {
                // 领取优惠不请安
                var res = await app.db.couponSend({
                    shopId: options.shop_id ,
                    stock_id: options.stock_id,
                })
                this.setData({
                    showDialog:true,
                    couponContent: res,
                })
            }
        }
        // scene = 5_22_10739083
        console.log(options.wue)

       
    },
    onReady() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
            success(res) {
                console.log('success', res)
            },
            fail(res) {
                console.log('fail', res)
            }
        })
    },
    onShow(){

        this.onInit()
    },

    async onInit(){

        // 先设置input输入框为fale
        this.setData({
            showPayDetail:false,
            inputPriceNum: '',
        })

        //  获取门店详情
        var res = await app.db.storeGetDetail({
            ShopId:this.data.shop_id
        })
        this.setData({
            store:res.data,
        })

        // 获取先享卡
        var res = await app.db.storeGetDiscountCard({
            ShopId:this.data.shop_id
        })
        this.setData({
            cardList: res.data,
            // cardList: [1],
        })


        // 检测用户是否有先享卡        
        var res = await app.db.storeCheckDiscountCard({
            ShopId:this.data.shop_id
        })
        
        this.setData({
            isHasDiscountCard: res.isHasDiscountCard,
            userDiscountCard:res.data
        })




        var res = await app.db.couponByMerchants({
            openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
            // Wxappid: "wxcd49aa99fd3d1f6a",、
            stock_id: "10833068",
            // status: "",
            // creator_mchid: "",
            // sender_mchid: "",
            // available_mchid: "",
            // offset: "",
            // limit: "",
            shopId: "22",
        })
        this.setData({
            couponList:res.data.data
        })

        

    },


    getCoupon(){

    },
    closeDialog(){
        this.setData({ showDialog :false})
    },

    onShareTimeline() {
        return {
            title: this.data.store.Name,
            query: "/pages/route/route?shop_id=" + this.data.store.Id,
            imageUrl: this.data.store.Logo,
        }
    },
    onShareAppMessage(){
        return {
            title: this.data.store.Name,
            path: "/pages/route/route?shop_id=" + this.data.store.Id,
            imageUrl: this.data.store.Logo,
        }
    }
})
