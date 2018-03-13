var htmlWepackPlugin = require('html-webpack-plugin');
var minify = require('html-minifier');
var path = require('path');
module.exports = {
    // context:''
    entry: './src//app.js',//单个文件
    // entry:['./src/script/main.js','./src/script/a.js'],//文件数组,将两个平行的文件打包在一起
    //对象
    // entry: {
    //     main: './src/script/main.js',
    //     a: './src/script/a.js',
    //     b: './src/script/b.js',
    //     c: './src/script/c.js'
    // },
    output: {
        path: __dirname + '/dist',//打包后文件目录
        filename: 'js/[name].bundle.js',//打包后文件名,对静态资源的管理有用，可做版本号，只会上线改过的文件
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: path.resolve(__dirname + 'src'),
                exclude: path.resolve(__dirname + 'node_modules'),
                query: {
                    presets: ['env']
                }
            },
            {
                test: /\.css$/,
                //importLoaders:在css-loader前应用的loader的数目, 默认为0
                loader: "style-loader!css-loader?importLoaders=1!postcss-loader"
                // use: ["style-loader",
                //     { loader: "css-loader", options: { importLoaders: 1 } },
                //     "postcss-loader"]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!postcss-loader!less-loader"
                // use: ["style-loader",
                //     "css-loader",
                //     'postcss-loader',
                //     "less-loader"]
            }, {
                test: /\.html$/,
                loader: "html-loader"
            }, {
                test: /\.tpl$/,
                loader: "ejs-loader"
            }, {
                test: /\.(png|gif|jpg|jpeg|svg)$/i,
                //使用http载入的图片可以利用浏览器的缓存，使用base64编码的话会快，但是文件体积会变大
                // loader: "url-loader",
                loaders: [
                    "url-loader?limit=1000&name=assets/[name]-[hash:5].[ext]",
                    //通过image-webpack-loader可以压缩图片
                    "image-webpack-loader"],
                // query: {
                //     limit: 240000,
                //     name: "assets/[name]-[hash:5].[ext]"
                // }
            }
        ]
    },
    //使用配置项的plugin参数来关联
    plugins: [
        //给插件传参，
        new htmlWepackPlugin({
            filename: 'index.html',//指定生成的文件名
            template: 'index.html',//模版为根目录下的index.html
            inject: 'body',//指定嵌入在body还是head标签里
            title: "Webpack App"
        }),
        require("autoprefixer")
    ]

}