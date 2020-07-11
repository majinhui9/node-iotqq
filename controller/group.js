const { sendGroupMsg } = require('../request/api')
const { robotTalk } = require('../request/txRobot')
const config = require('../config/config')
const { talkFormats } = require('../util/index')


/* msg

{ CurrentPacket:
   { WebConnId: '234234-UvWEcT',
     Data:
      { FromGroupId: 234234234234,
        FromGroupName: 'iotbot',
        FromUserId: 234234234,
        FromNickName: 'Cloudy',
        Content: '今天（星期四）天气：\r多云转晴，\r15℃~29℃',
        MsgType: 'TextMsg',
        MsgTime: 2342342,
        MsgSeq: 17,
        MsgRandom: 2352345234,
        RedBaginfo: null } },
  CurrentQQ: 25235252 }

  { CurrentPacket:
   { WebConnId: 'RHlYV1yh3dJ35-UvWEcT',
     Data:
      { FromGroupId: 234234234,
        FromGroupName: 'iotbot',
        FromUserId: 2342342,
        FromNickName: 'sdfew',
        Content: '{"Content":"@机器人 你好","UserID":[252525]}',
        MsgType: 'AtMsg',
        MsgTime: 2342342,
        MsgSeq: 19,
        MsgRandom: 23452352,
        RedBaginfo: null } },
  CurrentQQ: 235252 }

 */
function handleGroupMsg(msg) {
  try {
    const data = msg.CurrentPacket.Data
    // 只对指定群并且@消息回复
    if (data && data.FromGroupId == config.groupCode && data.Content && data.MsgType == 'AtMsg') {
      let ctn = JSON.parse(data.Content)
      if (!ctn.UserID.includes(config.CurrentQQ)) return
      ctn = ctn.Content.replace(/(@[^ ]* )/g, '')
      robotTalk({ question: ctn }).then(res => {
        if (res && res.length) {
          res.forEach(item => {
            item.reply && sendGroupMsg({ content: talkFormats(item.reply + '') })
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleGroupMsg
}