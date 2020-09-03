
var dbFather = require('db_2_sign.js')
class dbMap extends dbFather {
    constructor() {
        super()
    }



    /**************查询门店*************/
    // all store
    storeGetList(data){
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/stores/visited/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    // get this store
    storeGetDetail(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/store/getbyid/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }



    //  获取先享卡点文本内容
    storeGetDiscountCard(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/store/getWxDiscountCard/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }

    //  检测用户是否领取了先享卡啊，没有领取，则领取；已经领取可以查看
    // 展示查看按钮，跳转小程序
    storeCheckDiscountCard(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/payscore/checkuserdiscountcard/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    // 用户调用小程序，领取先享卡
    storePullDiscountCard(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/payscore/pullwxdiscountcard/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**************轮播图*************/
    // 用户调用小程序，领取先享卡
    storeGetBannerList(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "/api/shop/banner/",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }


    /**************支付*************/

   
    // 预取单
    payPre(data) {
        return new Promise((resolve, reject) => {
            wx.showLoading({
              title: '优惠查询中',
            })
            this.base({
                url: this.HOST_URL + "api/order/precaculFee/",
                data: data,
                method: "POST",
            }).then(res => {
                wx.hideLoading()
                resolve(res)
            }).catch(res => {
                wx.hideLoading()
                reject(res)
            })
        })
    }

    // 确认下单
    payConfirm(data) {
        return new Promise((resolve, reject) => {
            this.base({
                url: this.HOST_URL + "api/order/barcodetpay",
                data: data,
                method: "POST",
            }).then(res => {
                // console.log(res)
                resolve(res)
            }).catch(res => reject(res))
        })
    }




    /**************广告*************/

    adGetList(data) {
        return new Promise((reslove, reject) => {
            // wx.showLoading({ title: "上传中" })
            data = data || {}
            data.action = "ad_get_list"
            wx.cloud.callFunction({
                name: 'marker',
                data: data,
                success: res => {
                    // wx.hideLoading()
                    var data = res.result
                    reslove(data)
                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }














    // /api/current_store

    mapLogin(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data.action = "login"
            wx.cloud.callFunction({
                name: 'marker',
                data: data,
                success: res => {
                    wx.hideLoading()
                    var data = res.result.data
                    wx.setStorageSync(this.KEY_OPEN_ID, data.openID) //session
                    // wx.setStorageSync(that.KEY_SN, "10" + data.sn)  //序列号
                    reslove(data)
                    
                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }
    /**
     * @method 获取地图列表
     * @return 
            _id:"",
            name: "丰丰的咖啡店",
            tagID: "",
            storeID: "",
            location: db.Geo.Point(113, 23),
            callout:"早上8点就开搞",
            imageList:[],
            tel:"123213",
     */
    mapGetList(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data.action = "get_list"
            wx.cloud.callFunction({
                name: 'marker',
                data: data,
                success: res => {
                    wx.hideLoading()
                    reslove(res.result.data)
                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }

    // 获取详情
    mapGetDetail(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            wx.cloud.callFunction({
                name: 'map_get_detail',
                data: data,
                success: res => {
                    wx.hideLoading()
                    reslove(res.result)
                },
                fail: res => {
                    console.log(res)
                },
            })
        })
    }


    // 获取所有店铺信息，编辑用
    mapGetEdtList() {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            wx.cloud.callFunction({
                name: 'map_edt_get',
                // data: obj,
                success: res => {
                    wx.hideLoading()
                    reslove(res.result.data)
                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }

    /**
     * @method 增加坐标点
     */
    mapAddMarker(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            wx.cloud.callFunction({
                name: 'map_add',
                data: data,
                success: res => {
                    wx.hideLoading()
                    reslove(res.result)
                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }

}
module.exports = dbMap