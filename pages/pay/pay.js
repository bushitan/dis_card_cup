// pages/pay/pay.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        price:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.setData({
        //     price : options.price || 1
        // })
        
    },



    toStore(){
        wx.navigateBack({
            
        })
    },

    toAlert(){

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})