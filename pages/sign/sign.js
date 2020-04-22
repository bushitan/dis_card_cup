// pages/sign/step1/step1.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        numList: [
            {
                name: '开始'
            }, {
                name: '等待'
            }, {
                name: '错误'
            }, {
                name: '完成'
            },
        ],
        num: 0,


        room:{},
        coverList: [],
        coverMax: 12,
        logoList: [],
        logoMax: 1,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 保存
    save(e) {
        console.log(e)
        var formData = e.detail.value
        for (var i in formData) {
            if (formData[i] == '') {
                wx.showToast({
                    title: "请填写完整信息",
                    icon: "loading"
                })
                return
            }
        }
        if (this.data.coverList.length == 0) {
            wx.showToast({
                title: "请上传图片",
                icon: "loading"
            })
            return
        }

        wx.showModal({
            title: '提交成功',
            content: '工作人员审核通过将与您联系',
            showCancel:false,
            success:res=>{
                wx.navigateBack({
                    
                })
            }
        })

        // if (this.data.logoList.length == 0) {
        //     wx.showToast({
        //         title: "无反面图片",
        //         icon: "loading"
        //     })
        //     return
        // }


        // this.saveAdd(formData)

    },

    async saveAdd(formData) {
        var userID = 1
        // 上传cover
        var coverUrl = this.data.coverList[0]
        var filePath = this.data.coverList[0]
        var isLocal = /^cloud:\/\//.test(filePath)
        if (!isLocal) {
            var cloudName = "cover/" + userID + "_" + new Date().getTime()
            var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
            coverUrl = await this.db.uploadImage({
                filePath: filePath,
                cloudPath: cloudPath,
            })
        }
        formData.coverUrl = coverUrl

        var hostLogoUrl = this.data.logoList[0]
        filePath = this.data.logoList[0]
        var isLocal = /^cloud:\/\//.test(filePath)
        if (!isLocal) {
            var cloudName = "logo/" + userID + "_" + new Date().getTime()
            var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
            hostLogoUrl = await this.db.uploadImage({
                filePath: filePath,
                cloudPath: cloudPath,
            })
        }
        formData.hostLogoUrl = hostLogoUrl

        formData._id = _id
        formData.isShow = true
        // formData.sn = 0
        formData.status = this.data.status
        console.log(formData)
        // debugger
        var res = await this.db.roomAdd(formData)
        console.log(res)
        wx.showModal({
            title: res.msg,
            showCancel: false,
            success(res) {
                var prePage = getCurrentPages()[getCurrentPages().length - 2]
                prePage.$vm.onInit()
                wx.navigateBack()

                
            },
        })
    },



    /*************封面的编辑*************/
    DelCover(index) {
        wx.showModal({
            title: '确定要删除这长图片?',
            success: res => {
                if (res.confirm) {
                    this.data.coverList.splice(index, 1);
                    this.setData({
                        coverList: this.data.coverList
                    })
                }
            }
        })
    },
    ViewCover(url) {
        console.log("ViewCover")
        wx.previewImage({
            urls: this.data.coverList,
            current: url
        });
    },
    ChooseCover() {
        console.log("ChooseCover")
        wx.chooseImage({
            count: this.data.coverMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.coverList.length != 0) {
                    this.setData({
                        coverList: this.data.coverList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        coverList: res.tempFilePaths
                    })
                }
            }
        });
    },



    /*************LOGO的编辑*************/
    DelLogo(index) {
        wx.showModal({
            title: '确定要删除这长图片?',
            success: res => {
                if (res.confirm) {
                    this.data.logoList.splice(index, 1);
                    this.setData({
                        logoList: this.data.logoList
                    })
                }
            }
        })
    },
    ViewLogo(url) {
        wx.previewImage({
            urls: this.data.logoList,
            current: url
        });
    },
    ChooseLogo() {
        wx.chooseImage({
            count: this.data.logoMax, //默认9
            sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
            // sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.logoList.length != 0) {
                    this.setData({
                        logoList: this.data.logoList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        logoList: res.tempFilePaths
                    })
                }
            }
        });
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})