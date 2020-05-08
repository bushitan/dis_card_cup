// pages/alert/alert.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        storeName:"",
        inputPrice:"",
        payPrice: "",
        discountPrice: "",
        isHasDiscountCard:false,

        //分享参数设置
        sendMessageTitle: "",
        sendMessagePath: "",
        sendMessageImg: "",
    },
    behaviors: [app.baseBehavior],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.data.sharedText)

        this.sharedMethod()
        // this.onLoad()
        console.log(this.data.sharedText)

        this.onInit()
    },

    async onInit(){
        var prePage = getCurrentPages()[getCurrentPages().length - 2]
        // debugger
        this.setData({
            storeName: prePage.data.store.Name,

            inputPrice: prePage.data.inputPrice,
            discountPrice: prePage.data.discountPrice,
            payPrice: prePage.data.payPrice,

            // isHasDiscountCard: prePage.data.isHasDiscountCard, //用户是否有领取先享卡

            // sendMessageTitle: prePage.data.store.Name,
            // sendMessagePath: "pages/store/store?shop_id=" + prePage.data.store.Id,
            // sendMessageImg: prePage.data.store.Logo,
        })


        // 检测用户是否有先享卡        
        var res = await app.db.storeCheckDiscountCard({
            ShopId: prePage.data.shop_id
        })
        this.setData({
            isHasDiscountCard: res.isHasDiscountCard,
            userDiscountCard: res.data
        })
    },

    
    toCardDetail() {
        var prePage = getCurrentPages()[getCurrentPages().length - 2]
        prePage.getCardDetail()
    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        // debugger

        var prePage = getCurrentPages()[getCurrentPages().length - 2]
        return {
            title: prePage.data.store.Name,
            path: "/pages/route/route?shop_id=" + prePage.data.store.Id,
            imageUrl: prePage.data.store.Logo,
        }
    }
})