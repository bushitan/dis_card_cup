

var dbFather = require('db_1_base.js')
class dbSon extends dbFather {



    constructor() {
        super()

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