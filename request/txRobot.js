const config = require('../config/config')
const axios = require('axios');

let userid = undefined

function robotTalk(params) {
  if (userid && new Date().getTime() - userid > 120000) {
    userid = undefined
  }
  const url = `http://api.tianapi.com/txapi/robot/index`
  return axios({
    method: 'get',
    url,
    params: {...params, key: config.txKey, limit: 9, userid }
  }).then(res => {
    if (!userid) { userid = getUId() }
    if (res.data.code == 200) {
      return res.data.newslist
    } else {
      return []
    }
  })
}

function getUId() {
  return new Date().getTime()
}

module.exports = {
  robotTalk
}