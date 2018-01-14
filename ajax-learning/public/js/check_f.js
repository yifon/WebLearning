$(function () {
    $.ajaxSetup({
        dataType: "text",
        type: "POST",
        success: function (data) {
            $("#infoList").append("<li>你输入的数字 <b>" + $("#inputNumber").val() + "</b>是<b>" + data + "</b></li>");
        },
        error: function (data) {
            $("#infoList").append("报错！");
        }
    })
    $("#load1").bind("click", function () {
        var $this = $(this);
        //在本地直接post慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $.post("http://www.imooc.com/data/check_f.php",function(){

        //借助本地的代理服务器向目标服务器发送数据
        //方式1，用.post()
        // $.post("http://localhost:3000/data/check_f.php", {
        //     num: $("#inputNumber").val()
        // },
        //     function (data) {
        //         $("#infoList").append("<li>你输入的数字 <b>" + $("#inputNumber").val() + "</b>是<b>" + data + "</b></li>");
        //     })
        //方式2，用.ajax()
        $.ajax({
            url: "http://localhost:3000/data/check.php",
            data: {
                num: $("#inputNumber").val()
            }
        })
    });
    $("#load2").bind("click", function () {
        var $this = $(this);
        $.ajax({
            url: "http://localhost:3000/data/check_f.php",
            data: {
                num: $("#inputNumber").val()
            }
        })
    });
})