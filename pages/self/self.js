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
            name: '饮品季'
        },
        {
            icon: 'shopfill',
            image: '/images/icon_2.png',
            color: 'red',
            badge: 120,
            name: '咖啡奶茶'
        }, {
            icon: 'goodsfill',
            image: '/images/icon_3.png',
            color: 'orange',
            badge: 1,
            name: '生活服务'
        },
        ],


        isLoad:!false,
        swiperList:[
            // "https://mmbiz.qpic.cn/sz_mmbiz_png/5IoRWl64Ed266Dy8hLXUQxBeYobJlIMDUMuRReZNUHwDMtKZicfia72KwqUdS74JUq9ia9ib9FgTdY44H0xiaB0QiaMA/0?wx_fmt=png",

            "/images/swiper1.jpg",
            "/images/swiper2.jpg",
        ],


        storeList: [],

        TabCur: 0,
        scrollLeft: 0,
        tabList: ["咖啡", "酒店", "美业"],

        couponList:[],

    },
    behaviors: [baseBehavior],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onInit()
        console.log(wx.getSystemInfoSync())
    },
    onReady(){
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
            success(res) {
                console.log('success', res)
            },
            fail(res) {
                console.log('fail', res)
            }
        })
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
            storeList: storeList,
            currentStoreList: storeList,
        })




        var res = await app.db.couponByMerchants({
            openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
            Wxappid: "wxcd49aa99fd3d1f6a",
            // stock_id: "10833068",
            // status: "",
            // creator_mchid: "",
            // sender_mchid: "",
            // available_mchid: "",
            // offset: "",
            // limit: "",
            shopId: "22",
        })
        this.setData({
            couponList: res.data.data
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

    clickMenu(e){
        // wx.showToast({
        //     title: '全部加载成功',
        //     icon: "success"
        // })
        var index = e.currentTarget.dataset.index

        var liveIDList = [22,31,38,39,40,41,42,46,47]
        if(index == 0 ){
            this.setData({ currentStoreList: this.data.storeList})
        }
        if (index == 1) {
            this.filterCoffeStoreList(liveIDList)
        }
        if (index == 2) {
            this.filterStoreList(liveIDList)
        }
    },

    filterCoffeStoreList(id_list) {
        var storeList = this.data.storeList
        var currentStoreList = []
        for (var i = 0; i < storeList.length; i++){
            var temp = false
            for (var j = 0; j < id_list.length; j++) {
                if (storeList[i].Id == id_list[j])
                    temp = true
            }
            if(temp == false)
                currentStoreList.push(storeList[i])
        }
        console.log(currentStoreList)

        this.setData({
            currentStoreList: currentStoreList
        })
    },

    filterStoreList(id_list ){
        var storeList = this.data.storeList
        var currentStoreList = []
        for (var i = 0; i < storeList.length; i++)
            for (var j = 0; j < id_list.length; j++)
            {
                if (storeList[i].Id == id_list[j] )
                    currentStoreList.push(storeList[i])
            }
        
        this.setData({
            currentStoreList: currentStoreList
        })
    },



    // 去报名
    toSign(e) { 
        var index = e.currentTarget.dataset.index
        if(index == 0 ){
            var url = "https://mp.weixin.qq.com/s/qZkIhxrkPUkVNjgzzGmaQA"
            wx.navigateTo({ url: `/pages/article/article?url=${url}`, })
        } else
            wx.navigateTo({
                url: '/pages/sign/sign',
            })
    },

    clickSwiper(e){

        var index = e.currentTarget.dataset.index
        if (index == 0) {
            var url = "https://mp.weixin.qq.com/s/qZkIhxrkPUkVNjgzzGmaQA"
            wx.navigateTo({ url: `/pages/article/article?url=${url}`, })
        }
        if (index == 1) {
            wx.navigateToMiniProgram({
                appId: 'wx952a5c480745c869',
                path:"pages/menu/menu"
            })
            // var url = "https://mp.weixin.qq.com/s/qZkIhxrkPUkVNjgzzGmaQA"
            // wx.navigateTo({ url: `/pages/article/article?url=${url}`, })
        } 
        // else
        //     wx.navigateTo({
        //         url: '/pages/sign/sign',
        //     })
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

    onShareTimeline(){
        return {
            title: "优惠派发中",
            query: "/pages/route/route",
        }
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