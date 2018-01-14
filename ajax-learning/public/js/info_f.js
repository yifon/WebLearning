$(function () {
    $(document).ajaxStart(function () {
        $("#inProgress").show();
    })
    $(document).ajaxStop(function () {
        $("#inProgress").hide();
    })
    $("#load").bind("click", function () {
        var $this = $(this);
        //在本地直接get慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $.get("http://www.imooc.com/data/info_f.php",function(){

        //借助本地的代理服务器去获取目标服务器的资源
        //方式1
        // $.get("http://localhost:3000/data/info_f.php", function (data) {
        //     $this.attr("disabled", "true");
        //     $("#infoList").append("<li>我的名字叫：" + data.name + "</li>");
        //     $("#infoList").append("<li>常常有人对我说：" + data.say + "</li>");
        // }, "json")

        //方式2 .ajax
        $.ajax({
            url: "http://localhost:3000/data/info_f.php",
            dataType: "json",
            success: function (data) {
                $this.attr("disabled", "true");
                $("#infoList").append("<li>我的名字叫：" + data.name + "</li>");
                $("#infoList").append("<li>常常有人对我说：" + data.say + "</li>");
            }
        })
    })
    var stuList = [
        { "name": "yifon" },
        { "name": "june" },
        { "name": "apple" }];
    $.each(stuList, function (index, item) {
        // $("#stuList").append("<li>姓名：" + stuList[index].name + "</li>");
        $("#stuList").append("<li>姓名：" + item.name + "</li>");
    })
})