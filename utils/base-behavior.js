
var app
module.exports = Behavior({
    data: {
        sharedText: '',        
        adList: [],

    },
    methods: {
        sharedMethod: function () {
            // this.data.sharedText === 'This is a piece of data shared between pages.'
            this.setData({
                sharedText:"1324r354"
            })

            console.log("11", this.data.payPrice)
        },


    },

    onLoad() {
        console.log("behavior onload")
    },
    created() { 
        console.time()  
        console.log("created")
    },

    attached() {
        console.log("attached")
    },

    ready() {
        app = getApp()
        
        console.log("ready")
        this.setData({
            adList: app.adList
        })
        console.timeEnd()
    },
    moved() {
        console.log("moved")
    },

    detached() {
        console.log("detached")
    },
})