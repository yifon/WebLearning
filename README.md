# bootstrap-learning
关于bootstrap的学习

index.html
-----------
bootstrap快速入门

参考课程： https://www.imooc.com/learn/826

# ajax-learning
启动命令:
1. 首先要启动mongodb,可参考另一个教程的配置
2. 接着grunt启动应用即可

localhost:3000/staff
-----------
利用Ajax异步查询员工信息，以及创建员工信息。
课程服务器端采用PHP,同时传递伪数据。

参考课程： https://www.imooc.com/learn/250

改造：

### 1.语言：
前端页面渲染和交互采用jade,bootstrap,jquery,ajax;服务器端采用node.js;数据库使用mongodb;同时使用grunt自动编译

### 2.参考：
整个结构可以参考我另一个项目 https://github.com/yifon/nodejs-learning/tree/master/movie ，staff这个项目是在理解了Scott老师结构的基础上套用改造的。

### 3.功能：
员工编号staffId是唯一的。
#### 查询:
若staffId存在，则提供员工信息。若不存在则提醒。
#### 创建:
若staffId存在，则不可以创建。若不存在则可以创建
#### 修改:
若staffId不存在，则不可以修改。若存在则可以修改
#### 响应／服务器等报错的提醒：
![image](https://github.com/yifon/WebLearning/blob/master/ajax-learning/public/images/2.png) ![image](https://github.com/yifon/WebLearning/blob/master/ajax-learning/public/images/4.png)


![image](https://github.com/yifon/WebLearning/blob/master/ajax-learning/public/images/3.png)![image](https://github.com/yifon/WebLearning/blob/master/ajax-learning/public/images/1.png)


localhost:3000/fruit
-----------
慕课网上有个例子https://www.imooc.com/code/13468 使用jquery的load()方法异步获取http://www.imooc.com/data/fruit_part.html 的资源，在线编程不会有跨域的问题，但是复制到本地直接用客户端去访问就会有跨域的问题。解决跨域的问题可以搭个本地服务器，再使用代理，实现客户端->请求本地服务器->请求慕课网资源,解决跨域问题。

本地用node.js搭了服务器，再使用代理中间件做请求的转发http-proxy-middleware。
代码只需要看fruit相关的即可。

实现结果：
![image](https://github.com/yifon/WebLearning/blob/master/ajax-learning/public/images/fruit.png)
..(待续)