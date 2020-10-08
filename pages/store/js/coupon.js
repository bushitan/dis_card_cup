/**
 * v1 版本先享卡，预支付计算
 */

var app = getApp()
module.exports = Behavior({
    data: {
        showCouponListDialog: false, // 对话框
        showCouponGetDialog: false, // 对话框
        couponContent: "", // 领取优惠券点结果
        couponList: [],//我在当前门店的优惠券列表
        stockList:[],
    },
    ready() {
        console.log( 'coupon')
        this.onInitCoupon()
    },

    methods: {
        async onInitCoupon() {

            // 自动领取优惠券
            // if (options.hasOwnProperty("stock_id")) {
            //     if (options.stock_id) {
            //         // 领取优惠不请安
            //         var res = await app.db.couponSend({
            //             shopId: options.shop_id,
            //             stock_id: options.stock_id,
            //         })
            //         this.setData({
            //             showDialog: true,
            //             couponContent: res,
            //         })
            //     }
            // }

 // openid: wx.getStorageSync(app.db.KEY_OPEN_ID),
                // Wxappid: "wxcd49aa99fd3d1f6a",、
                // stock_id: "10833068",
                // status: "",
                // creator_mchid: "",
                // sender_mchid: "",
                // available_mchid: "",
                // offset: "",
                // limit: "",
                // shopId: "22",

            // 查询用户的优惠券
            var res = await app.db.couponByMerchants({})
            this.setData({
                couponList: this.filterCouponList(res.data.data.data) // 过滤可领取优惠券
            })


            // 获取门店拥有的优惠券
            var res = await app.db.couponGetListByShop({
                PageSize: 10,
                Page: 0,
                // shopId: '22',
                shopId: this.data.store.Id,
            })
            var stockList = this.filterstockList(res.data)// 过滤可领取优惠券批次
            this.setData({
                stockList: stockList 
            })
            if (stockList.length > 0)
                this.openConponListDialog()
            // this.filterCouponList() // 过滤可领取优惠券

        },

        // 过滤已经取优惠券
        filterCouponList(couponList) {
            // var stockList = this.data.stockList
            // var couponList = this.data.couponList
            var shopId = this.data.store.Id
            var tempList = []
            for (var i = 0; i < couponList.length ;i++){
                for (var j in couponList[i].shop_ids){
                    if (shopId == couponList[i].shop_ids[j]){
                        tempList.push(couponList[i])
                    }
                }
            }
            // console.log(tempList)
            return tempList
        },
        // 过滤可领取优惠券批次
        filterstockList(stockList) {
            // var stockList = this.data.stockList
            var couponList = this.data.couponList
            // var shopId = this.data.store.Id
            var tempList = []
            for (var i = 0; i < stockList.length; i++) {
                var isExist = false 
                for (var j = 0; j < couponList.length ; j++){                   
                    if (stockList[i].stock_id == couponList[j].stock_id){
                        isExist = true
                    }
                }
                if (isExist == false)
                    tempList.push(stockList[i])
            }
            return tempList
            // console.log(tempList)
            // return tempList
        },

        async getCouponCard(e){
            console.log('getCoupon')
            var stock_id = e.currentTarget.dataset.stock_id
            var res = await app.db.couponSend({
                shopId: this.data.store.Id,
                stock_id: stock_id,
                // out_request_no : "",
                // Wxappid: "",
                // stock_creator_mchid : "",
                // coupon_value : "",
                // coupon_minimum : "",
            })
            if(res.hasOwnProperty("coupon_id") )
                wx.showModal({
                    title: '领取成功',
                    success :(res) =>{
                        this.getCouponSuccess(stock_id)
                    }
                })
            else
                wx.showModal({
                    title: res.msg
                })
        },

        // 领取优惠券成功
        getCouponSuccess(stock_id){
            // 筛选未领取的券
            var stockList = this.data.stockList
            var tempList = []
            for (var i = 0; i < stockList.length;i++){
                if (stock_id != stockList[i].stock_id)
                    tempList.push(stockList[i])
            }
            this.setData({
                stockList:tempList
            })

            // 全部领取，关闭优惠券列表
            if (tempList.length == 0)
                this.closeConponListDialog()
        },

        // 打开优惠券列表对话框
        openConponListDialog(){
            this.setData({ showCouponListDialog:true})
        },
        // 关闭优惠券列表对话框
        closeConponListDialog() {
            this.setData({ showCouponListDialog: false })
        },
    },




    // onLoad() {
    //     console.log("behavior onload")
    // },
    // created() {
    //     console.log("created")
    // },

    // attached() {
    //     console.log("attached")
    // },

    
    // moved() {
    //     console.log("moved")
    // },

    // detached() {
    //     console.log("detached")
    // },
})