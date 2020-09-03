// pages/route/route.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shop_id:"",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            shop_id: options.shop_id,
            stock_id: options.stock_id,
        })
        this.checkScene(options)
    },

    onReady(){

        console.log("page onLoad")
        wx.showLoading({
            title: '登录中',
        })
        // this.test()

        // var that = this
        // setTimeout(function(){
        //     that.onInit()
        // },2000)

        this.onInit()
    },
    checkScene(options){
        if (options.hasOwnProperty('scene')) {
            const scene = decodeURIComponent(options.scene) 

            var sceneList = scene.split('_')
            var mode = sceneList[0]
            var shop_id = sceneList[1]
            var stock_id = sceneList[2]

            this.setData({
                shop_id: shop_id,
                stock_id: stock_id,
            })
        }
    },
    async onInit(){

        await app.db.sysLogin()

        
        wx.hideLoading()

        var shop_id = this.data.shop_id
        if (shop_id){
            var url = '/pages/store/store?shop_id=' + shop_id 
            if (this.data.stock_id)
                url = url + "&stock_id=" + this.data.stock_id
            wx.redirectTo({
                url: url ,
            })
        } else{

            // wx.redirectTo({
            //     url: '/pages/list/list',
            // })
            wx.switchTab({
                url: '/pages/list/list',
            }) 
        }


        // wx.redirectTo({
        //     // url: '/pages/store/store?shop_id=15',
        //     url: '/pages/store/store?shop_id=10',
        // })
        

    },

    async test() {
        
        // //  1、系统登陆，获取session
        // await app.db.sysLogin()
        // //  2、获取所有门店
        // await app.db.storeGetList()
        // //　3、获取门店详情
        // await app.db.storeGetDetail({
        //     ShopId:9
        // })

        // //  4、获取门店先享卡的内容描述
        // await app.db.storeGetDiscountCard({
        //     ShopId: 9
        // })　
        // //　5、检测用户是否有先享卡        
        // await app.db.storeCheckDiscountCard({
        //     ShopId:9
        // })

        // //  6、跳转小程序领取先享卡
        // await app.db.storePullDiscountCard({
        //     ShopId : 9,
        //     discountcardId : "",
        //     wxappid:"",
        // })　

        //　7、支付计算
        // await app.db.payPre({
        //     price:5
        // })
        //　8、正式支付下单
        // await app.db.payConfirm({
        //     price: 5
        // })
       

        // var res = await app.db.couponSend({
        //     shopId: '22',
        //     stock_id: '10833068',
        //     out_request_no : "",
        //     Wxappid: "",
        //     stock_creator_mchid : "",
        //     coupon_value : "",
        //     coupon_minimum : "",
        // })

        // var coupon_id = 12482622825
        // var res = await app.db.couponQueryCondition({
        //     limit:10,
        //     offset:0,
        //     status:"running",

        //     shopId: '22',
        //     // stock_id: '10833068',
        //     // out_request_no : "",
        //     // Wxappid: "wxcd49aa99fd3d1f6a",
        //     // stock_creator_mchid : "",
        //     // coupon_value : "",
        //     // coupon_minimum : "",
        // })
        // await app.db.couponGetDetail({
        //     coupon_id: coupon_id,
        //     stock_id: '10833068',
        //     stock_creator_mchid: "",
        // })

        // await app.db.couponMerchants({
        //     stock_creator_mchid: "1593971131",
        //     stock_id: '10833068',
        //     shopId: '22',
        // })
        


        await app.db.couponByMerchants({
            openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
            Wxappid: "wxcd49aa99fd3d1f6a",
            stock_id: "10833068",
            status:"",
            creator_mchid: "",
            sender_mchid: "",
            available_mchid: "",
            offset: "",
            limit: "",
            shopId: "22",
        })
        



        // await app.db.couponGetListByShop({
        //     // openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
        //     // Wxappid: "wxcd49aa99fd3d1f6a",
        //     // stock_id:"10782984",
        //     shopId: '22',
        // })



        // await app.db.couponGetListByShop({
        //     Page: 0,
        //     PageSize: 10,
        //     shopId: '22',
        // })

        // var res = await app.db.couponGetListByMy({
        //     Page: 1,
        //     PageSize: 10,
        //     shopId: '22',
        //     // status:10,
        // })

        // console.log(res)
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})