// pages/route/route.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // this.test()
        this.onInit()
    },

    async onInit(){

        await app.db.sysLogin()
        wx.redirectTo({
            url: '/pages/list/list',
        })
    },

    async test() {

        //  1、系统登陆，获取session
        await app.db.sysLogin()
        //  2、获取所有门店
        await app.db.storeGetList()
        //　3、获取门店详情
        await app.db.storeGetDetail({
            ShopId:9
        })

        //  4、获取门店先享卡的内容描述
        await app.db.storeGetDiscountCard({
            ShopId: 9
        })　
        //　5、检测用户是否有先享卡        
        await app.db.storeCheckDiscountCard({
            ShopId:9
        })

        //  6、跳转小程序领取先享卡
        await app.db.storePullDiscountCard({
            ShopId : 9,
            discountcardId : "",
            wxappid:"",
        })　

        //　7、支付计算
        await app.db.payPre({
            price:5
        })
        //　8、正式支付下单
        // await app.db.payConfirm({
        //     price: 5
        // })
       

        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

       
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