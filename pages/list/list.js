// pages/list/list.js

var baseBehavior = require('../../utils/base-behavior.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {


        gridCol: 3,
        iconList: [
        {
            icon: 'locationfill',
            image:'/images/icon_1.png',
            color: 'red',
            badge: 120,
            name: '咖啡'
        },
        {
            icon: 'shopfill',
            image: '/images/icon_2.png',
            color: 'red',
            badge: 120,
            name: '美食'
        }, {
            icon: 'goodsfill',
            image: '/images/icon_3.png',
            color: 'orange',
            badge: 1,
            name: '生活'
        },
        //  {
        //     icon: 'cartfill',
        //     color: 'yellow',
        //     badge: 0,
        //     name: '购物'
        // }, 
        // {
        //     icon: 'eve',
        //     color: 'olive',
        //     badge: 22,
        //     name: '通知'
        // }, {
        //     icon: 'upstagefill',
        //     color: 'cyan',
        //     badge: 0,
        //     name: '排行榜'
        // }, {
        //     icon: 'clothesfill',
        //     color: 'blue',
        //     badge: 0,
        //     name: '皮肤'
        // }, {
        //     icon: 'discoverfill',
        //     color: 'purple',
        //     badge: 0,
        //     name: '发现'
        // }, {
        //     icon: 'questionfill',
        //     color: 'mauve',
        //     badge: 0,
        //     name: '帮助'
        // }, {
        //     icon: 'commandfill',
        //     color: 'purple',
        //     badge: 0,
        //     name: '问答'
        // }, {
        //     icon: 'brandfill',
        //     color: 'mauve',
        //     badge: 0,
        //     name: '版权'
        // }
        ],


        isLoad:!false,
        swiperList:[
            "/images/swiper1.jpg",
            "/images/swiper2.jpg"
        ],












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

        var storeList = res.data
        // var storeList = []
        // storeList = storeList.concat(res.data)
        // storeList = storeList.concat(res.data)
        // storeList = storeList.concat(res.data)
        // storeList = storeList.concat(res.data)
        // storeList = storeList.concat(res.data)

        for (var i in  storeList){
            var _temp = storeList[i].CompanyVat.split(",")
            storeList[i].discount = _temp[0]
            storeList[i].remain = _temp[1]
        }


        this.setData({
            storeList: storeList
        })
    },


    toDisCard(){
        wx.navigateToMiniProgram({
            appId: "wxcc2e4fbc5887661e",
            extraData: {
            },
            success(res) {
                console.log("success", res)
            },
            fail(res) {
                console.log("fail", res)
            },
        })

    },
    toSearch(){
        wx.showToast({
            title: '搜索成功',
            icon:"success"
        })
    },
    toArea(){
        wx.showModal({
            title: '其他地区未开放',
            showCancel:false,
        })
    },

    clickMenu(){
        wx.showToast({
            title: '全部加载成功',
            icon: "success"
        })
    },

    // 去报名
    toSign() { 
        wx.navigateTo({
            url: '/pages/sign/sign',
        })
    },

    /**
     * @method 去商铺
     */
    toStore(e) {
       

        // return 
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