$(function () {
    $("#load").bind("click", function () {
        var $this = $(this);
        //在本地直接post慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $.post("http://www.imooc.com/data/check_f.php",function(){

        //借助本地的代理服务器向目标服务器发送数据
        //方式1
        $.post("http://localhost:3000/data/check_f.php", {
            num: $("#inputNumber").val()
        },
            function (data) {
                // $this.attr("disabled", "true");
                $("#infoList").append("<li>你输入的数字 <b>" + $("#inputNumber").val() + "</b>是<b>" + data + "</b></li>");
            })
    });
})