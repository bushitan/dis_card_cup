// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        storeList: [
            {
                myScore: 0,
                storeDes: "先享88折",
                storeLogo: "/images/icon/oct.png",
                // storeLogo: "http://img.12xiong.top/WechatIMG71.png",
               
                storeMaxScore: 6,
                storeMinScore: 6,
                storeName: "O.CT COFFEE",
                storeUUID: "3876178a-7232-11e9-b3cf-e95aa2c51b5d",
            },
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },


    /**
     * @method 去商铺
     */
    toStore(e) {
        var storeUUID = e.currentTarget.dataset.store_uuid
        console.log(storeUUID)
        wx.navigateTo({
            url: '/pages/store/store?storeUUID=' + storeUUID,
        })
    },



    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})