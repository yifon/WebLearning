const path = require("path");//处理路径
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
//判断是开放环境还是生产环境
const isDev = process.env.NODE_ENV === "development";
const config = {
    target: "web",
    entry: path.join(__dirname, "src/index.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.jsx$/,
                loader: "babel-loader"
            }, {
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
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            //stylus-loader和postcss-loader都会生成sourceMap,这样声明可以直接使用stylus生成的sourceMap,编译效率更高
                            sourceMap: true
                        }
                    },
                    "stylus-loader"
                ]
            }, {
                test: /\.(png|gif|jpg|jpeg|svg)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10240,//如果文件大小小于1024kb,则会转成base64插入到代码中去
                        name: "[name]-[hash].[ext]"//.ext即文件的后缀名
                    }
                }],
            }
        ]
    },
    plugins: [
        //相当于定义了全局变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}
if (isDev) {
    config.devtool = "#cheap-module-eval-source-map",
        config.devServer = {
            port: 8000,
            host: "0.0.0.0",//可以通过127.0.0.1和内网ip进行访问
            overlay: {
                errors: true//将错误显示在页面中
            },
            //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
            // historyApiFallback:{

            // },
            // open: true,//启动webpack-dev-server的时候自动打开浏览器
            hot: true//只渲染组件的效果
        },
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        )
}
module.exports = config;
