// pages/pay/pay.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        price:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     price : options.price || 1
        // })
        
        this.testPay()
    },


    async testPay() {
        await app.db.mapLogin()


        console.log(wx.getStorageSync(app.db.KEY_OPEN_ID))
        wx.request({
            url: "https://wm.51zfgx.com/api/order/testpay/",
            method: "POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
                openID: wx.getStorageSync(app.db.KEY_OPEN_ID),
                subappid: "wxcd49aa99fd3d1f6a",
                subappsecret: "6987d998aa8d01b4a8a6ad405386a239",
                submchid: "1578701271",
                price: this.data.price,
            },
            success(res) {
                console.log(res)
                var payData = res.data.data
                wx.requestPayment({
                    timeStamp: payData.timeStamp,
                    nonceStr: payData.nonceStr,
                    package: payData.package,
                    signType: payData.signType,
                    paySign: payData.subpaySign,
                    success : res=> {
                        console.log("支付成功", res)
                        this.toAlert()

                    },
                    fail(res) {
                        console.log("支付失败", res)
                    }
                })
            },
            fail(res) {
                console.log(res)
            },
        })
    },

    toStore(){
        wx.navigateBack({
            
        })
    },

    toAlert(){

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})