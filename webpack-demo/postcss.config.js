module.exports = {
    plugins: [
        //浏览器加前缀
        require('autoprefixer')({
            browsers: ['last 5 versions']
        })
    ]
}