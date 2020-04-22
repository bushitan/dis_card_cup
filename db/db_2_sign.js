

var dbFather = require('db_1_base.js')
class dbSon extends dbFather {



    constructor() {
        super()

    }

    //添加报名
    signAdd(data){
        // return new Promise((reslove, reject) => {
        //     wx.showLoading({ title: "上传中" })
        //     wx.cloud.callFunction({
        //         name: 'store_self_add',
        //         data: obj,
        //         success: res => {
        //             wx.hideLoading()
        //             console.log(res.result)
        //             reslove(res.result)
        //         },
        //         fail: res => {
        //             console.log(res.result)
        //             reject(res.result)
        //         },
        //     })
        // })

        return new Promise((reslove, reject) => {
            wx.showLoading({ title: "上传中" })
            data = data || {}
            data.action = "sign_add"
            wx.cloud.callFunction({
                name: 'marker',
                data: data,
                success: res => {
                    wx.hideLoading()
                    var data = res.result.data
                    // wx.setStorageSync(this.KEY_OPEN_ID, data.openID) //session
                    reslove(data)

                },
                fail: res => {
                    console.log(res.result)
                },
            })
        })
    }

    // 上传图片
    uploadImage(obj){
        return new Promise((reslove, reject) => {
            // var data = {}
            // reslove(data)
            wx.showLoading({ title: "图片上传中" })
            wx.cloud.uploadFile({
                cloudPath: obj.cloudPath,
                filePath: obj.filePath,
                success: res => {
                    wx.hideLoading()
                    reslove(res.fileID)
                },
                fail: e => {
                    console.error('[上传文件] 失败：', e)
                    wx.showToast({
                        icon: 'none',
                        title: '上传失败请重试',
                    })
                    // reject()
                },
                complete: () => {
                    wx.hideLoading()
                }
            })
        })
    }
}


module.exports = dbSon