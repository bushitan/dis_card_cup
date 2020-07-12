
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
         * @mehtod 查询批次详情API   查看该批次优惠券是否可用
         * @param
            shopId: '22',
            stock_id: '10782984',
            stock_creator_mchid: "",
        */
    couponGetDetail(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/coupondetail/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /** 4
         * @mehtod 查询代金券详情API
         * @param
            coupon_id
            shopId
        */
    couponGetCashDetail(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/cashcoupondetail/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /** 5
         * @mehtod 查询代金券详情API
         * @param
            offset
            limit
            stock_creator_mchid
            stock_id
            shopId
        */
    couponMerchants(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/coupon/merchants/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /** 6
         * @mehtod 查询代金券可用单品
         * @param
            offset
            limit
            stock_creator_mchid
            stock_id
            shopId
        */
    couponGoods(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/coupon/goods/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /** 7
         * @mehtod 根据商户号查用户的券
         * @param
            openid
            Wxappid
            stock_id
            status
            creator_mchid
            sender_mchid
            available_mchid
            offset
            limit
            shopId            
        */
    couponByMerchants(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/query/couponsbymerchants/",
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
                url: this.HOST_URL + "api/query/mycoupons/",
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