

class dbSon {
    KEY_OPEN_ID = "open_id"

    constructor() {

    }


    // 封装基础的请求
    base(options) {
        return new Promise((resolve, reject) => {
            var data = options.data || {}
            data['customer_uuid'] = wx.getStorageSync(this.KEY_UUID)


            data['session'] = wx.getStorageSync(this.KEY_SESSION)
            wx.request({
                url: options.url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' // 默认值
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
            wx.showLoading({ title: '登陆中...', })
            wx.login({
                success(e) {
                    that.base({
                        url: that.HOST_URL + "ajdm/syslogin/",
                        data: {
                            jscode: e.code,
                            appid: that.APP_ID,
                        },
                        method: "POST",
                    }).then(res => {
                        wx.hideLoading()
                        if (res.code == 0) {
                            wx.setStorageSync(that.KEY_SESSION, res.data.session) //session
                            wx.setStorageSync(that.KEY_SN, "10" + res.data.sn)  //序列号
                        }
                        resolve(true)
                    }).catch(res => {
                        wx.hideLoading()
                        resolve(false)
                    })
                },
            })

        })
    }




}

module.exports = dbSon