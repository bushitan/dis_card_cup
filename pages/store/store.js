//index.js
//获取应用实例
var card = require('js/card.js')
var pay = require('js/pay.js')
var coupon = require('js/coupon.js')
var discount = require('js/discount.js')
var banner = require('js/banner.js')
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

    behaviors: [app.baseBehavior, card, pay, coupon, discount, banner],

    async onLoad(options) {
        this.setData({
            shop_id:options.shop_id || ""
        })
        if(options.hasOwnProperty("card_id")){
            this.getShare(options)
        }


        // scene = 5_22_10739083
        console.log(options)

       
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

        // if (this.data.shop_id >= 70)//  先享卡服务商模式        
        //     this.onInitDiscount() 
        // else
        this.onInit()
    },

    /**
     * v1 原有传统模式的先享卡
     */
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

        this.checkUserDiscountCard() //检测用户是否有先享卡 
    },

    /**检测用户是否有先享卡 */
    async checkUserDiscountCard(){
        // 检测用户是否有先享卡        
        var res = await app.db.storeCheckDiscountCard({
            ShopId: this.data.shop_id
        })

        this.setData({
            // isHasDiscountCard: !res.isHasDiscountCard,
            isHasDiscountCard: res.isHasDiscountCard,
            userDiscountCard: res.data
        })
    },



    /**领取先享卡 */
    getCard(e) {

        if (this.data.shop_id >= 70)//  先享卡服务商模式        
            this.getDicountCardV2(e)  
        else
            this.getNewCard(e)   //普通商户模式
    },  

    /**查看先享卡 */
    lookCard(){

        if (this.data.shop_id >= 70)//  先享卡服务商模式        
            this.lookDicountCardDetailV2()
        else
            this.getCardDetail()   //普通商户模式
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
        var path = "/pages/route/route?shop_id=" + this.data.store.Id
        if (this.data.isHasDiscountCard)
            path = "/pages/route/route?shop_id=" + this.data.store.Id 
                + "&&card_id=" + this.data.cardList[0].discount_card_id
            + "&user_id=" + wx.getStorageSync(app.db.KEY_SN)

        console.log(path)
        return {
            title: this.data.store.Name,
            path: path ,
            imageUrl: this.data.store.Logo,
        }
    }
})
