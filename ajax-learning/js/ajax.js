var request = new XMLHttpRequest();
request.open("GET", "get.php", true);
request.send();
/**
 * ＝＝readyState属性：
 * 0:请求未初始化，open还没有调用
 * 1:服务器连接已建立，open已经调用了
 * 2:请求已接收，也就是接收到头信息了
 * 3:请求处理中，也就是接收到响应主体了
 * 4:请求已完成，且响应已就绪，也就是响应完成了
 * ＝＝响应:
 * responseText:获得字符串形式到响应数据
 * responseXML:获得XML形式的响应数据
 * status/statusText:以数字和文本形式返回HTTP状态码
 * getAllResponseHeader():获取所有的响应报头
 * getResponseHeader():查询响应中的某个字段的值
 */
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {

    }
}
/**
 * jQuery.ajax([settings])
 * type:类型，"POST"或 "GET",默认为"GET"
 * url:发送请求的地址
 * data:是一个对象,连同请求发送到服务器到数据
 * dataType:预期服务器返回到数据类型。如果不指定，jQuery将自动根据HTTP包MIME信息来智能判断，一般采用"json"格式
 * success:是一个方法，请求成功后的回调函数。传入返回后的数据，以及包含成功代码的字符串
 * error:是一个方法，请求失败时调用此函数。传入XMLHttpRequest对象
 */

$(document).ready(function () {
    $("#search").click(function () {
        $.ajax({
            type: "GET",
            url: "",
            dataType: "jsonp",
            jsonp:"callback",//参数名为callback
            success: function (data) {
                if (data.success) {
                    $("#searchResult").html(data.msg);
                } else {
                    $("#searchResult").html("出现错误:" + data.msg);
                }
            },
            error: function (jqXHR) {
                console.log("发生错误:" + jqXHR.status);
            }
        })
    })
    $("#save").click(function () {
        $.ajax({
            type: "POST",
            url: "",
            dataType: "json",
            data: {
                name: $("#staffName").val(),
                number: $("#staffNumber").val(),
                sex: $("#staffSex").val(),
                job: $("#staffJob").val()
            },
            success: function (data) {
                if (data.success) {
                    $("#createResult").html(data.msg);
                } else {
                    $("#createResult").html("出现错误:" + data.msg);
                }
            },
            error: function (jqXHR) {
                console.log("发生错误：" + jqXHR.status);
            }
        })
    })
})