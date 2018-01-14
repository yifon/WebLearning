//获取http://www.imooc.com/data/sport.json的运动json数据
exports.crosJson = function (req, res) {
    res.render('sport', {
        title: "代理-跨域获取json"
    })
}
//加载http://www.imooc.com/data/sport_f.js文件内容
exports.crosJs = function (req, res) {
    res.render('sport_f', {
        title: "代理-跨域获取js文件"
    })
}