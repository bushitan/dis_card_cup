const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function countdownYMDhms(start, end) {
    var count = 1;//该方法执行几次，count相应++
    var date1 = new Date(start);
    var date2 = new Date(end);
    var s1 = date1.getTime();
    var s2 = date2.getTime();//毫秒为单位
    var total = (s2 - s1) / 1000 - count;//每执行一次，减少时间差-1
    var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
    var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
    var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
    var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
    var min = parseInt(afterHour / 60); //计算整数分
    var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60;

    // day + ' 天 ' + hour + ' 时 ' + min + ' 分 ' + afterMin + ' 秒'
    var countdown = ""
    if( day > 0)
        countdown = day + ' 天 ' + hour + ' 时 ' + min + ' 分 ' + afterMin + ' 秒'
    else {
        if (hour > 0)
            countdown = hour + ' 时 ' + min + ' 分 ' + afterMin + ' 秒'
        else {
            if (min > 0)
                countdown =  + min + ' 分 ' + afterMin + ' 秒'
            else {

                if (afterMin > 0)
                    countdown = afterMin + ' 秒'
            }
        }

    }
       

    return countdown

}

module.exports = {
    formatTime: formatTime,
    countdownYMDhms: countdownYMDhms,
}
