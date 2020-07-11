// const axios = require('axios');
const request = require('request-promise').defaults({ json: true, gzip: true })
const config = require('../config/config');

const WEB_API = config.serverHost
const CurrentQQ = config.CurrentQQ


function callApi (name, params) {
  const url = `${WEB_API}/v1/LuaApiCaller?qq=${CurrentQQ}&funcname=${name}&timeout=10`
  if (params) return request.post(url, { body: params })
  return request.get(url)
}

module.exports = {
  callApi, request
}