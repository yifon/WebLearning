$(function () {
    $("#load").bind("click", function () {
        var $this = $(this);
        //在本地直接load慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $.getJSON("http://www.imooc.com/data/sport.json",function(){

        //借助本地的代理服务器去获取目标服务器的资源
        //方式1
        $.getJSON("http://localhost:3000/data/sport.json", function (data) {
            $this.attr("disabled", "true");
            $.each(data, function (index, sport) {
                $("#sportList").append("<li>" + sport["name"] + "</li>");
            })
        })
    })
})