
var dbFather = require('db_5_pay.js')
class dbMap extends dbFather {
    constructor() {
        super()
    }
    
    /**************查询门店*************/
    /**
     * @mehtod 发代金券
     * @param
        shopId        
        stock_id
        out_request_no
        Wxappid
        stock_creator_mchid
        coupon_value
        coupon_minimum
     */
    couponSend(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/send/wxcoupons/",
                // url: "https://wm.51zfgx.com/api/send/wxcoupons",
                // url: "http://139.159.241.56/api/send/wxcoupons",
                
                // url: this.HOST_URL + "api/gettoken/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /** 2
         * @mehtod 条件查询批次列表API
         * @param
            offset
            limit
            stock_creator_mchid
            create_start_time
            create_end_time
            status
            shopId
        */
    couponQueryCondition(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/conditionquerycoupons/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /** 3
         * @mehtod 根据商户获取优惠券
         * @param
            Page
            PageSize
            shopId
        */
    couponGetListByShop(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/allcoupons",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    /** 4
         * @mehtod 根据用户获取优惠券
         * @param
            Page
            PageSize
            shopId
            status
        */
    couponGetListByMy(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/mycoupons",
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