$(function () {
    $("#load").bind("click", function () {
        var $this = $(this);
        //在本地直接load慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $("#fruitList").load("http://www.imooc.com/data/fruit_part.html",function(){

        //借助本地的代理服务器去获取目标服务器的资源
        //方式1
        $("#fruitList").load("http://localhost:3000/data/fruit_part.html", function () {
            $this.attr("disabled", "true");
        })

        //方式2
        // $.ajax({
        //     type:"get",
        //     data:"html",
        //     url:"http://localhost:3000/data/fruit_part.html",
        //     success:function(data){
        //         $("#fruitList").html(data);
        //         $this.attr("disabled", "true");
        //     },
        //     error:function(data){
        //         console.log(data);
        //     }
        // })
    })
})