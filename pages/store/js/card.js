
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
            //         "discount_card_id": "20200429185046uCBfTx36D7Q0117937",
            //         "mch_id": "1587868291",
            //         "appid": "wxcd49aa99fd3d1f6a",
            //         "out_trade_no": "77f06efccd574849a82565e0197f3f56",
            //         "timestamp": "1588406384",
            //         "nonce_str": "FE841409F621417927ABA358CB0A9F83",
            //         "sign_type": "WECHATPAY2-SHA256-RSA2048",
            //         "serial_no": "346CF8D8785D3E4E894FDEE51B46E7709CC6DBCD",
            //         "sign": "1glGcOc8cMR+mLkvTbFe/HWVHqUA6WGZd+38SIplMBZnabxaPWgM+sjHTqR23UIYFsufhxJGFDK7WZo2b2oXbzRvLmDVSXJM44bFBK6FrsBn/dThpOaSBlgDAOLsyFyBgAbdbozj91q6AoweGXm3ZNIbpWJNgN7eqdyBm1FZR6wZck8TynGkNUQS64f3g2CLOScCHytLroRR738gqZzMpGjYA3hGAJjUSyD6h20NNXcfOVQGqG8Wjen/AGldD/HCfRd4PAJBpCCLP2joT/6e0ezSR/p71/iUsHMuy1QPDtasUBtHh32p5TGyp7KpLyqfQjj1XxvyXdVF4mFzhQMtow=="
            //     }
            // }


            // var res = {
            //     "code": 0,
            //     "msg": "拉起成功",
            //     "data": {
            //         "discount_card_id": "20200429185252IzejL00K2hc0117937",
            //         "appid": "wxcd49aa99fd3d1f6a",
            //         "mch_id": "1588268511",
            //         "out_trade_no": "1a695f778edc474aa443b372df291048",
            //         "timestamp": "1588408671",
            //         "nonce_str": "0678039F6F18E34C1E9E3C48817AB712",
            //         "sign_type": "WECHATPAY2-SHA256-RSA2048",
            //         "serial_no": "346CF8D8785D3E4E894FDEE51B46E7709CC6DBCD",
            //         "sign": "eUFdmNCXYvIelpvFlU/ixSsCLIPmW+OU+DFhoEDlusFYm6ewehx0Xn6AUlzoyiMVliWNmHn7fkiuanFLyB7y40PwdVOcGapFzQRieak1TMcJ0wwCl3EXLwxgRDMRwQAP9xYuHDu2zlUNnJKxswW7eaEi9bmoqX4KjY+LRnVP1+bnkBReZ8M0McsrZqmwInWFEh/mb838k/XYTSeP8VQA6/02NxRAKsbY/JyiHLK9YmCzEjf6Ly+vg1xmfmrq2AkiniU2SAQYLv9rI/3J4xFA4Nq3Xep8Ixukbvwk7iR8kbQMR5fKfUVFkO7fg3Uavc93b8jmjapfJM0PgV4CXxxC4g=="
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