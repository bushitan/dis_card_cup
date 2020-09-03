
var dbFather = require('db_6_coupon.js')
class dbMap extends dbFather {
    constructor() {
        super()
    }
    
    /** 
          * @mehtod 获取v2 先享卡token
          * @param
             Page
             PageSize
             shopId
             status
         */
    wxDiscountCardPrepareCardToken(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/wxdiscountcard/prepare_card_token/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /** 
            * @mehtod 点击分享接口，
            * @param
               Page
               PageSize
               shopId
               status
           */
    wxDiscountCardGetShare(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/pickup/checkdiscountcard/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }







    /** 
          * @mehtod  获取信息
          * @param
             Page
             PageSize
             shopId
             status
         */
    wxDiscountCardGetCertInfo(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "/api/wx/getcertinfo/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /** 
         * @mehtod 获取通知
         * @param
            Page
            PageSize
            shopId
            status
        */
    wxDiscountCardNotify(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/wxdiscountcard/notify/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    

}
module.exports = dbMap