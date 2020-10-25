

// import dbFather from '../db/db_6_seller.js'
var dbFather = require('db_3_store.js')
class db extends dbFather {


    constructor() {
        super()

    }

}

var DB = new db()
// DB.init()
// DB.getGeoStoreList({
//     store_uuid: 'e8eeb038-a2d0-11ea-97f8-e95aa2c51b5d', //&longitude=108.333693&latitude=22.805182// this.data.storeUUID,
//     // isToday: this.data.TabCur == 0?true :false,
//     range: 1 //this.data.SortMenu[this.data.TabCur].range
// })

module.exports = DB