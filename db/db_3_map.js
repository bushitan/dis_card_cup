
var dbFather = require('db_2_sign.js')
class dbMap extends dbFather {
    constructor() {
        super()
    }

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