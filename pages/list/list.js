// pages/list/list.js

var baseBehavior = require('../../utils/base-behavior.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        storeList: [
            // {
            //     Id:15,
            //     showDiscountCard:true,
            // },
            // {
            //     myScore: 0,
            //     storeDes: "先享88折",
            //     storeLogo: "/images/icon/oct.png",
            //     // storeLogo: "http://img.12xiong.top/WechatIMG71.png",
               
            //     storeMaxScore: 6,
            //     storeMinScore: 6,
            //     storeName: "O.CT COFFEE",
            //     storeUUID: "3876178a-7232-11e9-b3cf-e95aa2c51b5d",
            // },
            // {
            //     myScore: 0,
            //     storeDes: "先享2元",
            //     storeLogo: "http://img.12xiong.top/coffee_image/upload/IGyXK6fZ.jpg",
            //     storeMaxScore: 6,
            //     storeMinScore: 6,
            //     storeName: "StrongCoffee 唯微文文咖啡商店",
            //     storeUUID: "b29c4dee-b35e-11e9-869d-e95aa2c51b5d",
            // }
        ],


        TabCur: 0,
        scrollLeft: 0,
        tabList: ["咖啡", "酒店", "美业"],

    },
    behaviors: [baseBehavior],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
    },

    async onInit(e) {

        var res = await app.db.storeGetList()
        this.setData({
            storeList: res.data
        })
    },



    /**
     * @method 去商铺
     */
    toStore(e) {
        var shop_id = e.currentTarget.dataset.shop_id
        // console.log(storeUUID)
        wx.navigateTo({
            url: '/pages/store/store?shop_id=' + shop_id,
        })
    },

    // 选择
    tabSelect(e) {
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: "优惠派发中",
            path: "/pages/route/route",
        }
    },
})