//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        inputPrice: '',
        discountPrice: 0.5,
        payPrice: '',

        shop_id:"",
        store:{},
        cardList:[1],

        isDiscountCard: false,
        userDiscountCard:{},
        // price:0
    },
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
        // var res = await app.db.storeGetDiscountCard({
        //     ShopId:this.data.shop_id
        // })
        // this.setData({
        //     cardList:res.data,
        // })


        // 检测用户是否有先享卡        
        var res = await app.db.storeCheckDiscountCard({
            ShopId:this.data.shop_id
        })
        this.setData({
            isDiscountCard:res.isDiscountCard,
            userDiscountCard:res.data
        })

    },

    // 领取先享卡
    async getNewCard(){
        var res = await app.db.storePullDiscountCard({
            ShopId : this.data.shop_id,
            discountcardId : "",
            wxappid:"",
        })

        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            // path: "/pages/get-card/get-card",
            // extraData: {
            //     "discount_card_id": data.discount_card_id,
            //     "mch_id": data.mch_id,
            //     "appid": data.appid,
            //     "out_trade_no": data.out_trade_no,
            //     "timestamp": data.timestamp,
            //     "nonce_str": data.nonce_str,
            //     "sign_type": data.sign_type,
            //     "serial_no": data.serial_no,
            //     "sign": data.sign,
            // },
            success(res) {
                console.log("success", res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })
    },

    // 查看先享卡内容
    // card的id是通过storeCheckDiscountCard获取
    getCardDetail(){
        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            // path: "/pages/get-card/get-card",
            // extraData: {
            //     "discount_card_id": data.discount_card_id,
            //     "mch_id": data.mch_id,
            //     "appid": data.appid,
            //     "out_trade_no": data.out_trade_no,
            //     "timestamp": data.timestamp,
            //     "nonce_str": data.nonce_str,
            //     "sign_type": data.sign_type,
            //     "serial_no": data.serial_no,
            //     "sign": data.sign,
            // },
            success(res) {
                console.log("success", res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })
    },






    async inputConfirm(e){
        console.log(e)
        var inputPrice = parseInt(e.detail.value)

         //　7、支付计算
        var res = await app.db.payPre({
            ShopId : this.data.shop_id,
            price:inputPrice
        })
        var data = res.data
        this.setData({
            inputPrice: inputPrice,
            discountPrice: data.discountamount,
            payPrice: data.realfee,
        })

        // var inputPrice = parseInt(e.detail.value)
        // var payPrice =  this.data.inputPrice - this.data.discountPrice 
        // this.setData({
        //     inputPrice: inputPrice,
        //     discountPrice: 5,
        //     payPrice: payPrice > 0 ? payPrice : 0,
        // })
    },
    async toPay(){
        if(this.data.inputPrice == "" ){
            wx.showToast({
                title: '请输入金额',
                icon:"loading"
            })
            return 
        }

        var res = await app.db.payConfirm({
            ShopId : this.data.shop_id,
            price:this.data.inputPrice,
        })
        var data = res.data
        wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.subpaySign,
            success : res=> {
                console.log("支付成功", res)
                this.toAlert()

            },
            fail(res) {
                console.log("支付失败", res)
            }
        })
        // wx.navigateTo({
        //     url: '/pages/pay/pay?price=' + this.data.payPrice,
        // })         

        
    },
    


    toSign(){
        wx.navigateTo({
            url: '/pages/sign/sign',
        })
    },



    onShareAppMessage(){}
})
