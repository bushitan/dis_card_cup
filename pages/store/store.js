//index.js
//获取应用实例
var card = require('js/card.js')
var pay = require('js/pay.js')
var coupon = require('js/coupon.js')
var discount = require('js/discount.js')
const app = getApp()

Page({
    data: {

        shop_id:"",
        store:{},
        cardList:[],

        isHasDiscountCard: false,
        userDiscountCard:{},


        InputBottom:0,
        // price:0
    },

    behaviors: [app.baseBehavior, card, pay, coupon, discount],

    async onLoad(options) {
        this.setData({
            shop_id:options.shop_id || ""
        })

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


        //  先享卡服务商模式
        this.onInitDiscount()


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
            // isHasDiscountCard: !res.isHasDiscountCard,
            isHasDiscountCard: res.isHasDiscountCard,
            userDiscountCard:res.data
        })


       
    },

    // closeDialog(){
    //     this.setData({ showDialog :false})
    // },

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
