

var dbFather = require('db_1_base.js')
var name = "geo"
class db extends dbFather {


    constructor() {
        super()

    }

    /**
     * @method 查询集点地理位置列表
     * @data
            store_uuid: 'e8eeb038-a2d0-11ea-97f8-e95aa2c51b5d',
            isToday: true,
            range: 1 
        
     */
    getGeoStoreList(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading({ title: '加载中', })

            data = data || {}
            data['action'] = "get_geo_store_list"
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

}


module.exports = db