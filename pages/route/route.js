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
            shop_id : options.shop_id
        })
    },

    onReady(){

        console.log("page onLoad")
        wx.showLoading({
            title: '登录中',
        })
        this.test()

        // var that = this
        // setTimeout(function(){
        //     that.onInit()
        // },2000)
        // that.onInit()
    },
    async onInit(){

        await app.db.sysLogin()
        await app.db.sysLogin()
        
        wx.hideLoading()

        var shop_id = this.data.shop_id
        if (shop_id){
            wx.redirectTo({
                url: '/pages/store/store?shop_id=' + shop_id,
            })
        } else{

            wx.redirectTo({
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
       

        var res = await app.db.couponSend({
            shopId: '22',
            stock_id: '10782984',
            out_request_no : "",
            Wxappid: "wxcd49aa99fd3d1f6a",
            stock_creator_mchid : "",
            coupon_value : "",
            coupon_minimum : "",
        })
        console.log(res)

        await app.db.couponGetListByShop({
            Page:1,
            PageSize:10,
            shopId:22,
        })

        await app.db.couponGetListByMy({
            Page: 1,
            PageSize: 10,
            shopId: 22,
            // status:10,
        })
        
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