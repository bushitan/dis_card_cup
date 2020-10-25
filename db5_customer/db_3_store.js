

var dbFather = require('db_2_geo.js')
var name = "store"
class db extends dbFather {


    constructor() {
        super()

    }

    /**
      * @method 获取门店二维码
      * @data
             store_uuid: 'e8eeb038-a2d0-11ea-97f8-e95aa2c51b5d',
             isToday: true,
             range: 1 
         
      */
    getStoreQR(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading({ title: '获取中', })
            data = data || {}
            data['action'] = "get_store_code"
            console.log(this.cloud)
            this.cloud.callFunction({
                name: name,
                data: data,
                success: res => {
                    wx.hideLoading()
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    wx.hideLoading()
                    reject(res.result)
                },
            })
        })
    }


    // 根据门店获取产品列表
    storeGetProjectList(data) {
        return new Promise((reslove, reject) => {
            data = data || {}
            data['action'] = "product_get_list_by_store"
            this.cloud.callFunction({
                name: 'mall',
                data: data,
                success: res => {
                    if (res.result.code == 0)
                        reslove(res.result)
                },
                fail: res => {
                    // (res.result)
                    // console.log(res.result)
                    // wx.hideLoading()
                },
            })
        })
    }
}


module.exports = db