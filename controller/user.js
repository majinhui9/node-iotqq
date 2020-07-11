const { sendMsg } = require('../request/api')
const { robotTalk } = require('../request/txRobot')
const config = require('../config/config')
const { talkFormats } = require('../util/index')


/* msg
{ CurrentPacket:
   { WebConnId: '7nyk5eXsrfefsdfeI8Z2c',
     Data:
      { FromUin: 2342424,
        ToUin: 23453452452,
        MsgType: 'TextMsg',
        MsgSeq: 32226,
        Content: '测试',
        RedBaginfo: null } },
  CurrentQQ: 245253245 }

 */
function handleUserMsg(msg) {
  try {
    const data = msg.CurrentPacket.Data
    // 只对指定好友回复
    if (data && data.FromUin == config.toUserQQ && data.Content) {
      robotTalk({ question: data.Content }).then(res => {
        if (res && res.length) {
          res.forEach(item => {
            item.reply && sendMsg({ content: talkFormats(item.reply + '') })
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleUserMsg
}