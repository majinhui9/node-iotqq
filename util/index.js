
Date.prototype.Format = function(format) {
  format = format || 'yyyy-MM-dd hh:mm:ss'
  var o = {
    'M+': this.getMonth() + 1, //month
    'd+': this.getDate(), //day
    'h+': this.getHours(), //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  };
  var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(format)) {
    format = format.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};



function talkFormats(msg) {
  const talkObj = {
    '{robotname}': '帅气的机器人',
    '{appellation}': '',
    '{robottime}': new Date().Format(),
    '<br>': ' \\\\r ',
    '</br>': ' \\\\r '
  }
  let str = msg
  for (var k in talkObj) {
    const r = new RegExp('(' + k + ')', 'g')
    if (r.test(str)) {
      str = str.replace(r, talkObj[k]);
    }
  }
  return str
}

module.exports = {
  talkFormats
}