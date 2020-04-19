//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        inputPrice: '',
        discountPrice: 0.5,
        payPrice: '',
        // price:0
    },
    onLoad: function () {
      
    },


    inputConfirm(e){
        console.log(e)
        var inputPrice = parseInt(e.detail.value)
        var payPrice =  this.data.inputPrice - this.data.discountPrice 
        this.setData({
            inputPrice: inputPrice,
            discountPrice: 5,
            payPrice: payPrice > 0 ? payPrice : 0,
        })
    },
    toPay(){
        if(this.data.inputPrice == "" ){
            wx.showToast({
                title: '请输入金额',
                icon:"loading"
            })
            return 
        }

        wx.navigateTo({
            url: '/pages/pay/pay?price=' + this.data.payPrice,
        })
        // if (this.data.payPrice > 0)
        //     wx.navigateTo({
        //         url: '/pages/sign/step1/step1?price=' + this.data.payPrice,
        //     })
        // else{
        //     wx.showModal({
        //         title: '免单！',
        //         content: '谢谢惠顾',
        //         success(){
        //             wx.redirectTo({
        //                 url: '/pages/poi/poi',
        //             })
        //         },
        //     })
           
        // }
         
    },
    
})
