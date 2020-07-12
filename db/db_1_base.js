

class dbSon {
    KEY_SESSION = "session"
    KEY_OPEN_ID = "open_id"
    HOST_URL = "https://wm.51zfgx.com/" // 主机地址
    // HOST_URL = "http://139.159.241.56/" // 主机地址
    
    constructor() {

    }


    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            // data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)

            data['Session'] = wx.getStorageSync(this.KEY_SESSION) || ""
            data['AppId'] = "55714689209244b584e43573e90a6734"
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded', // 默认值
                    'User-Agent':"",
                    // 'content-Type': 'multipart/form-data'
                    // 'content-type':"application/json"
                },
                data: data,
                success(res) {
                    resolve(res.data)
                },
                fail(res) {
                    /**
                     * @method 错误日志上报
                     * @param 
                     *      session  用户
                     *      url      请求地址
                     *      data     请求数据
                     *      res      返回的错误
                     */
                    console.log(res)
                    console.log("请求错误：" + options.url, res)
                    reject(res)
                },
            })
        })
    }


    /**
     * @method 1 用户登录
     * @return 
     *      session 
     *      sn 序列号
     */
    sysLogin() {
        
        return new Promise((resolve, reject) => {
            var that = this
            wx.login({
                success(e) {
                    console.log("code", e.code)
                    // debugger
                    that.base({
                        url: that.HOST_URL + "api/gettoken/",
                        data: {
                            Code: e.code,
                            AppId: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        // debugger
                        wx.setStorageSync(that.KEY_SESSION, res.data.session) //session
                        // wx.setStorageSync(that.KEY_SN, "10" + res.data.data.sn)  //序列号
                        console.log("get customerGetToken success")
                        resolve(true)
                    })
                        .catch(res => {
                            console.log("get customerGetToken catch")
                            reject(false)
                        })
                },
                fail(res) {
                    console.log("login fail")
                    reject(false)
                },
            })
        })
    }




}

module.exports = dbSon