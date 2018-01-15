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

    /**
     * url:true 必须输入正确格式的网址
     * data:tur 必须输入正确格式的日期
     * dataISO:true 必须输入正确格式的日期(ISO)，利润2009-06-23
     * number:ture 必须输入合法的数字(负数，小数)
     * digits:true 必须输入整数
     * creditcard: 必须输入合法的信用卡号
     * equalTo:"#field" 输入值必须和#field相同
     * accept: 输入拥有合法后缀
     * maxlength:5 输入长度最多是5的字符串(汉字算一个字符)
     * minlength:10 输入长度最小是10的字符串(汉字算一个字符)
     * rangelength:[5,10] 输入长度必须介于5和10之间的字符串(汉字算一个字符)
     * range:[5,10] 输入值必须介于5和10之间
     * max:5 输入值不能大于5
     * min:10 输入值不能小于10
     */
    $("#verify").bind("click", function () {
        $("#form").validate({
            rules: {
                email: {
                    required: true,//必需输入的字段
                    email: true//必须输入正确格式的电子邮件
                },
                age: {
                    required: true,
                    digits: true,
                    min: 1
                }
            },
            //错误提示位置
            errorPlacement: function (err, element) {
                err.appendTo("#verifyResult");
            }
        })
    })

    var options = {
        url: "http://localhost:3000/data/form_f.php",
        target: "#infoResult",//返回结果放在target下
        type: "POST"
    }
    //cookie插件-cookie
    if ($.cookie("user")) {
        $("#user").val($.cookie("user"));
    }
    $("#submitInfo").bind("click", function () {
        $("#personalForm").ajaxForm(options);
        if ($("#chksave").is(":checked")) {
            $.cookie("user", $("#user").val(), { path: "/", expires: 1 });
        } else {
            $.cookie("user", null, { path: "/" });
        }
    })

    //图片灯箱插件——lightBox
    $(".divPics a").lightBox({
        overlayBgColor: "#666",//图片浏览时的背景色
        overlayOpacity: 0.5,//背景色的透明度
        containerResizeSpeed: 600//图片切换时的速度
    })

    //图片放大镜插件——jqzoom
    $("#jqzoom").jqzoom({
        zoomWidth: 230,//小图片所选区域的宽
        zoomHeigth: 230,//小图片所选区域的高
        zoomType: "reverse"//设置放大镜的类型
    })

    //搜索插件-autocomplete
    var arrUserName = ["王五", "刘明", "李小四", "刘促明", "李渊", "张小三", "王小明"];
    $("#txtSearch").autocomplete(arrUserName, {
        minChars: 0,//双击空白文本框时提示全部数据
        formatItem: function (data, i, total) {
            return "<I>" + data[0] + "</I>";//改变匹配数据显示的格式
        },
        formatMatch: function (data, i, total) {
            return data[0];
        },
        formatResult: function (data) {
            return data[0];
        }
    }).result(SearchCallback);//选中匹配数据中的某项数据时，调用插件的result()方法
    function SearchCallback(event, data, formatted) {
        $(".tip").show().html("您的选择是:" + (!data ? "空" : formatted));
    }

    //右键菜单插件-contextmenu
    $("#btnSubmit").contextMenu("sysMenu", {
        bindings: {
            "li1": function (item) {
                $(".tip1").show().html("您点击了’保存‘项");
            },
            "li2": function (item) {
                $(".tip1").show().html("您点击了‘退出’项");
            }
        }
    })

    //自定义对象级插件-lifocuscolor
    $("#ul").focusColor("#ccc");

    //自定义类级别插件－twoaddresult ,$.addNum(p1,p2) $.subNum(p1,p2)
    $("#btnCount").bind("click", function () {
        $("#Text3").val(
            $.subNum($("#Text1").val(), $("#Text2").val())
        );
    })

    //拖曳插件
    $("#x").draggable({ containment: "parent", axis: "x" });
    $("#y").draggable({ containment: "parent", axis: "y" });

    $(".drag2").draggable();
    $(".cart").droppable({
        drop: function () {
            $(this)
                .addClass("focus")//改变购物车的css
                .find("#tip3").html("");//删除原有内容
        }
    })
})