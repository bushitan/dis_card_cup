
var app = getApp()
module.exports = Behavior({
    data: {

    },
    methods: {


        async inputFocus() {
            this.setData({
                inputPrice: 0,
            })
        },

        async inputConfirm(e) {
            console.log(e)
            var inputPrice = parseFloat(e.detail.value)
            var inputPrice = inputPrice.toFixed(2)


            this.setData({
                inputPrice: inputPrice,
                // discountPrice: data.discountamount,
                // payPrice: data.realfee,
            })

            //　7、支付计算
            var res = await app.db.payPre({
                ShopId: this.data.shop_id,
                price: inputPrice
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



        // 实际支付
        async toPay() {
            if (this.data.inputPrice == "") {
                wx.showToast({
                    title: '请输入金额',
                    icon: "loading"
                })
                return
            }

            var res = await app.db.payConfirm({
                shopId: this.data.shop_id,
                price: this.data.inputPrice,
            })
            var data = res.data
            console.log(data)
            wx.requestPayment({
                timeStamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.subpaySign,
                success: res => {
                    console.log("支付成功", res)
                    // this.toAlert()

                },
                fail: res => {
                    console.log("支付失败", res)
                    // this.toAlert()
                }
            })
        },

        toAlert() {
            // this.setData({ showDialog: true })
            wx.navigateTo({
                url: '/pages/alert/alert',
            })
        },
    },

    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     console.log("attached")
    // },

    // ready() {
    // },
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})