
var app = getApp()
module.exports = Behavior({
    data: {
    },
    methods: {


        // 领取先享卡
        async getNewCard(e) {
            var discount_card_id = e.currentTarget.dataset.discount_card_id

            var res = await app.db.storePullDiscountCard({
                ShopId: this.data.shop_id,
                discountcardId: discount_card_id,
                wxappid: "wxcd49aa99fd3d1f6a",
            })

            // var res = {
            //     "code": 0,
            //     "msg": "拉起成功",
            //     "data": {
            //         "discount_card_id": "20200429185252IzejL00K2hc0117937",
            //         "mch_id": "1588268511",
            //         "appid": "wxcd49aa99fd3d1f6a",
            //         "out_trade_no": "140f543d7c29426dacd57a03bcc20a26",
            //         "timestamp": "1588769758",
            //         "nonce_str": "280B1DF3FE5B4518683CC0A42983E55D",
            //         "sign_type": "WECHATPAY2-SHA256-RSA2048",
            //         "serial_no": "796096ABC555EDBC76C5720A36EC9B186CBE7C59",
            //         "sign": "YMLM9AJLPjgM+XpMJD8XoQiRHElDGAfC9L/429kYE59/N5yxqtxHtRTpBWe11o32ckvRXfjm71qtsCVbFx67o8p3fCz/bO9J1eloUviDiZUpbqEAMNF5BFDefrGTFpa69PFcZHxKDjpArS3MJTQK8CvOXGSDg/i33jMydafy0K2mpn0+jhJfijtDxG1dM8n0W2YSG4Ng9XI8t4ccozYWr8319ZyKQJ2j/EREVzk+7Tvkd9ImgLMV/Yh4Az6+kH/viX1T6jN7aJB5Awc8HUkqr7gnMttE/cC59l4xpEe/gmSF3jLXtZQjAGOZg54BZpH27xbJdDhcLBN2/zPIe3qguw=="
            //     }
            // }
            var data = res.data



            wx.navigateToMiniProgram({
                appId: "wxcc2e4fbc5887661e",
                path: "/pages/get-card/get-card",
                extraData: {
                    "discount_card_id": data.discount_card_id,
                    "mch_id": data.mch_id,
                    "appid": data.appid,
                    "out_trade_no": data.out_trade_no,
                    "timestamp": data.timestamp,
                    "nonce_str": data.nonce_str,
                    "sign_type": data.sign_type,
                    "serial_no": data.serial_no,
                    "sign": data.sign,

                    // "discount_card_id": "20200429185046uCBfTx36D7Q0117937",
                    // "mch_id": "1587868291",
                    // "appid": "wxcd49aa99fd3d1f6a",
                    // "out_trade_no": "f9a181acd66e4ca7a8d59625a29dafb6",
                    // "timestamp": "1588405831",
                    // "nonce_str": "EE6C3C9492A24D2D618F8A3FA2F9BC0C",
                    // "sign_type": "WECHATPAY2-SHA256-RSA2048",
                    // "serial_no": "346CF8D8785D3E4E894FDEE51B46E7709CC6DBCD",
                    // "sign": "BGDzDHOUXA8jiuguRBVSgUGtXcgwTEdP1QlT7iAQDwV9m/vqlH/6Mo+G9mlvX48u6Ubv/VZ43noZ5rEneuKb8qQDcSiTjrlauRABcWmWXHDh1fl9pV7vJeXGH9qxjbUJph7s4lKBKbAleeRvEjntIS/ECujCV3oR74jCS9pxGBGxFeNRs9EGudqOKs2vfvx5nMd+p1XkkMpz792cYT8KfOyKOKViBZLE/DX8BEZsScTc+aYoTWDdLIexYVsRecwafw0KTCFsPxHUnkf3jr7XydDslZLWC3dJDK3Mc/wpoTR1KpFfi60WfQuke6mJg2wIdCSOo2WNw8XRTpcJ5jVHbQ=="

                },
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
        getCardDetail() {
            console.log( this.data.userDiscountCard.out_order_no)
            wx.navigateToMiniProgram({
                appId: "wxcc2e4fbc5887661e",
                path: "/pages/card-detail/card-detail?out_order_no=" + this.data.userDiscountCard.out_order_no,
                success(res) {
                    console.log("success", res)
                },
                fail(res) {
                    console.log("fail", res)
                },
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