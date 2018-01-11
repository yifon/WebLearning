# bootstrap-learning

关于bootstrap的学习

index.html
-----------
bootstrap快速入门

参考课程： https://www.imooc.com/learn/826


# ajax-learning

ajax1.html
-----------
利用Ajax异步查询员工信息，以及创建员工信息。
课程服务器端采用PHP,同时传递伪数据。

参考课程： https://www.imooc.com/learn/250

改造：

1.语言上：服务器端采用node.js,数据库使用mongodb

2.功能上增加修改功能，且由于staffId是唯一的，所以如果创建的时候若发现staffId已经在数据库中创建过，则应该在点击create按钮的时候提醒，并且将create按钮禁用，直到修改staffId可用为止；相似的，如果修改的时候发现staffId并不存在，则应该在点击update按钮的时候提醒，并且将update按钮禁用，直到修改staffId可用为止

前端使用bootstrap简单渲染下样式，jade做模版。

..(待续)