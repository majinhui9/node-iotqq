
## 项目简介

基于 IOTQQ + Node.js 实现自动qq机器人



## IOTQQ 下载及服务器（centos为例）部署 

1. 下载IOTQQ [传送门](https://gitter.im/IOTQQTalk/IOTQQ)

   64位系统应该下载iotbot_3.x.x_linux_arm64.tar.gz这个包
   ```
    // 解压
    tar -xzvf ***.tar.gz
    ```
  
2. 申请[Gitter Developer](https://developer.gitter.im/docs/welcome) 可用GitHub 授权登陆Gitter Developer 网站 换取Token
3. 填写配置文件CoreConf.conf 首先配置Token 后启动程序
  ```
    #自定义监听服务端口
    Port = "0.0.0.0:8888"
    #工作线程 默认50
    WorkerThread = 50
    #IOTBOT版本
    IOTQQVer = "v3.0.0"
    #Gitter Token
    Token = ""
  ```
4. 启动服务

- 运行程序 执行命令 ./IOTQQ 默认开启8888端口作为WebSokcet/WebApi的服务端口
- 首次登陆会拉取部分脚本并有详细输出 当出现 Everything is ok! 说明服务就绪
- 访问首页控制面板 `http://IP:PORT`
- 获取登陆二维码 访问Url `http://IP:PORT/v1/Login/GetQRcode` 扫码登陆即可
- 用下面的命令后台启动IOTQQ：
  ```
    nohup /path/to/iotbot >> /path/to/iotbot/log.txt 2>&1 &
  ```

## WEB API的调用
- [IOTQQ官网](https://github.com/IOTQQ/IOTQQ)提供Web API供外部调用，只要知道接口地址，可以用任何http工具或者编程语言调用
- IOTQQ项目中有个WebAPI.json，可以直接导入Chrome插件RestletClient，既可以直接调用测试，也可以作为文档参考，很方便，这个插件在Chrome商店里也能搜索到，新版本叫Talend API Tester
- 把WebAPI.json导入之前，可以找个文本编辑器修改一下，主要是把接口地址和QQ号批量替换一下，这样导入后可以直接用
- [Api接口及使用方法](https://www.showdoc.cc/IOTQQ?page_id=3708173005394329) 列出了常用的接口及参数说明
- [事件大全及参数释义](https://www.showdoc.cc/IOTQQ?page_id=3708020627972710)
- 使用request调用Web API的例子：
  ```js
    const request = require('request-promise').defaults({ json: true, gzip: true })
    async function callApi (name, params) {
      const url = `${WEB_API}/LuaApiCaller?qq=${LOGIN_QQ}&funcname=${name}&timeout=10`
      if (params) return request.post(url, { body: params })
      return request.get(url)
    }
  ```


## WebSocket接口的使用

- WebAPI是用来发消息、发指令的，对应的收消息、收事件则需要使用IOTQQ的websocket接口
- IOTQQ的websocket是基于socket.io实现的，不能直接用ws://...方式访问，因此网上的一些websocket测试工具都无法使用，只能用兼容socket.io的客户端访问
- nodejs开发需要引入socket.io-client库
- 简单代码如下：
  ```js
    var User = localStorage.getItem('User');
      var socket = io("127.0.0.1:8888", {
      transports: ['websocket']
    });

    socket.on('connect',
      function() {
          //从缓存或从cookies 读取历史登陆的QQ号
          //链接成功后获取用户缓存 获取成功后直接同步消息 失败直接获取二维码
          //同一浏览器会置换当前的websocket id
      
        if (User == null){

          //获取二维码
          socket.emit('GetQrcode', '1234', (data) =>{
            console.log(data); // data will be 'woot'
        
          })
        }else{

          socket.emit('GetWebConn', User, (data) =>{
          console.log(data);

        });

      }
      
    })
    socket.on('OnCheckLoginQrcode',
    function(data) {
      //48未扫描 53已扫码 17 49 过期了
      // if (data.Data.ScanStatus ==17 || data.Data.ScanStatus == 49){
      // }
        console.log(data);
    });

    socket.on('OnLoginSuccess',
    function(data) {

      // 移除所有
      localStorage.clear();
      console.log(data);

    });
    //统一事件管理如好友进群事件 好友请求事件 退群等事件集合
    socket.on('OnEvents', function (data) {
      console.log("收到相关事件");
      console.log(JSON.stringify(data));

    });
    //收到好友消息的回调事件
    socket.on('OnFriendMsgs', function (data) {
      console.log("收到好友消息");
      console.log(data);
      console.log(JSON.stringify(data))
    });
    //收到群消息的回调事件
    socket.on('OnGroupMsgs', function (data) {
      console.log("收到群消息");
      console.log(data);
      console.log(JSON.stringify(data))
    });
  ```

## node项目介绍

- 服务端框架 koa
- 接入 天行机器人api
- 文件夹/文件介绍

  ```
  node-iotqq
    ├─bin
    ├─config                         # 配置文件
    ├─controller
    │  ├─group.js                    # 处理群消息
    │  └─user.js                     # 处理好友消息 
    ├─middlewares                    # 中间件
    ├─public                         # 静态资源目录
    ├─request                        # 外部接口调用
    │  ├─api.js                      # IOTQQ 接口调用
    │  ├─index.js                    # 接口调用公共方法
    │  └─txRobot.js                  # 天行机器人api调用
    ├─routes                         # 对外api 路由
    ├─socket                         # IOTQQ socket 消息订阅 接收
    ├─util                           # 公共方法
    └─app.js                         # server入口
  ```





  
  

