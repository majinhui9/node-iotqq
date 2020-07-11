const {callApi} = require('./index')
const config = require('../config/config')

function sendMsg(params) {
  return callApi('SendMsg', {
    atUser: params.atUser || 0,
    content: params.content || '',
    groupid: 0,
    replayInfo: null,
    sendMsgType: params.type || "TextMsg",
    sendToType: 1,
    toUser: params.toUser || config.toUserQQ,
  })
}

function sendGroupMsg(params) {
  return callApi('SendMsg', {
    atUser: params.atUser || 0,
    content: params.content || '',
    groupid: 0,
    replayInfo: null,
    sendMsgType: params.type || "TextMsg",
    sendToType: 2,
    toUser: params.toGroup || config.groupCode
  })
}

module.exports = {
  sendMsg, sendGroupMsg
}