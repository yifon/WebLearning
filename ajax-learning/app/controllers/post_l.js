//测试本地post是否有请求体导致504的问题
exports.index = function (req, res) {
    res.render('post_l', {
        title: "测试本地post是否有请求体导致504的问题"
    });
}
//测试本地post是否有请求体导致504的问题
exports.check = function (req, res) {
    var num = req.body.num;//获取表单中的num数据
    var result;
    if (num > 0) {
        result = "大于0";
    }
    else if (num == 0) {
        result = "等于0";
    } else {
        result = "小于0";
    }
    res.render("check_l", {
        page: result,
        title: "响应本地的post"
    });
}
