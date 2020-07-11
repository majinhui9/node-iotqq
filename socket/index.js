const io = require('socket.io-client');
const config = require('../config/config')
const { handleUserMsg } = require('../controller/user')
const { handleGroupMsg } = require('../controller/group')

const socket = io(config.serverHost, {
    transports: ['websocket']
});
socket.on('connect', function () {
    socket.emit('GetWebConn', config.CurrentQQ + '', (data) => {
        console.log(data);
    });
});

//统一事件管理如好友进群事件 好友请求事件 退群等事件集合
socket.on('OnEvents', function (data) {
    console.log("收到相关事件");
    console.log(JSON.stringify(data));

});
//收到好友消息的回调事件
socket.on('OnFriendMsgs', function (data) {
  handleUserMsg(data)
});
//收到群消息的回调事件
socket.on('OnGroupMsgs', function (data) {
  handleGroupMsg(data)
});
