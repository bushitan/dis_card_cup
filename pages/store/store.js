//index.js
//获取应用实例
var card = require('js/card.js')
var pay = require('js/pay.js')
const app = getApp()

Page({
    data: {
        
        inputPrice: '',
        discountPrice: 0.5,
        payPrice: '',

        shop_id:"",
        store:{},
        cardList:[],

        isHasDiscountCard: false,
        userDiscountCard:{},

        showDialog:!true , // 对话框
        // price:0
    },

    behaviors: [app.baseBehavior,card,pay],

    onLoad(options) {
        this.setData({
            shop_id:options.shop_id || ""
        })


        this.onInit()
       
    },

    async onInit(){
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

    },
    closeDialog(){
        this.setData({ showDialog :false})
    },

    onShareAppMessage(){}
})
