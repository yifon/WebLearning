var htmlWepackPlugin = require('html-webpack-plugin');
var minify = require('html-minifier');
module.exports = {
    // entry:'./src/script/main.js',//单个文件
    // entry:['./src/script/main.js','./src/script/a.js'],//文件数组
    //对象
    entry: {
        main: './src/script/main.js',
        a: './src/script/a.js'
    },
    output: {
        path: __dirname + '/dist',//打包后文件目录
        // filename: '[name].js'//打包后文件名,对静态资源的管理有用
        // filename: '[name]-[hash].js'//打包后文件名,对静态资源的管理有用
        filename: 'js/[name]-[chunkhash].js',//打包后文件名,对静态资源的管理有用
        publicPath: 'http://cdn.com/'//占位符，上线时引用的js路径则会被替换为以publicPath为绝对路径开头的路径
    },
    //使用配置项的plugin参数来关联
    plugins: [
        //给插件传参，
        new htmlWepackPlugin({
            filename: 'index.html',//指定生成的文件名
            template: 'index.html',//模版为根目录下的index.html
            // inject:'head',//指定嵌入在body还是head标签里
            inject: false,//不指定嵌入路径
            title: 'webpack is good',//html的调用遵循ejs语法
            date: new Date(),
            //上线时的文件压缩
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]

}