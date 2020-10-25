
class dbBase {

    resourceAppid = 'wxd19bbe9cb3b293b6'
    resourceEnv = 'cup-customer-release'
    cloud 

    constructor() {


    }

    init(){
        return new Promise((reslove, reject) => {
            // 声明新的 cloud 实例
            this.cloud = new wx.cloud.Cloud({
                // 资源方 AppID
                resourceAppid: this.resourceAppid,
                // 资源方环境 ID
                resourceEnv: this.resourceEnv,
            })
            // console.log(c1)

            // 跨账号调用，必须等待 init 完成
            // init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
            // var res = await this.cloud.init()
            // console.log(res)
            this.cloud.init().then(res=>{
                console.log("clound init")
                reslove()
            }).catch(res=>{
                reject()
            })
        })
    }

    base(name,data) {
        return new Promise((reslove, reject) => {
            // data = data || {}
            // data['action'] = "get"
            this.cloud.callFunction({
                name: name,
                data: data,
                success: res => {
                    reslove(res.result)
                },
                fail: res => {
                    reject(res.result)
                    // console.log(res.result)
                    // wx.hideLoading()
                },
            })
        })
        // return adList
    }


    // // 封装基础的请求
    // base(options) {
    //     return new Promise((resolve, reject) => {
    //         var data = options.data || {}

    //         data['Session'] = wx.getStorageSync(this.KEY_SHARE_SESSION) 
    //         data["AppId"] = this.APP_ID

    //         var startTime = new Date().getTime();
    //         wx.request({
    //             url: options.url,
    //             method: options.method || "POST",
    //             header: {
    //                 'content-type': 'application/x-www-form-urlencoded' // 默认值
    //             },
    //             data: data,
    //             success(res) {

    //                 var completeTime = new Date().getTime();
    //                 console.log(options.url , ":", completeTime - startTime)
    //                 resolve(res.data)
    //             },
    //             fail(res) {
    //                 console.log("请求错误：" + options.url,res)
    //                 reject(res)
    //             },
    //         })
    //     })
    // }



}


module.exports = dbBase