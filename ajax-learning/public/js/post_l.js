$(function () {
    $("#load").bind("click", function () {
        var $this = $(this);
        //测试本地post是否有请求体导致504的问题
        $.post("http://localhost:3000/check_l", {
            num: $("#inputNumber").val()
        },
            function (data) {
                // $this.attr("disabled", "true");
                $("#infoList").append("<li>你输入的数字 <b>" + $("#inputNumber").val() + "</b>是<b>" + data + "</b></li>");
            })
    });
})