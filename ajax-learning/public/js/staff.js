$(document).ready(function () {
    $("#search").click(function () {
        $.ajax({
            type: "GET",
            url: "/search?staffId=" + $("#keyword").val(),
            dataType: "jsonp",
            jsonp: "callback",//参数名为callback
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
    //由于staffId是唯一的，所以如果创建的时候若发现staffId已经在数据库中创建过，则应该在点击create按钮的时候提醒，直到修改staffId可用为止；
    $("#create").click(function () {
        $.ajax({
            type: "POST",
            url: "/create",
            dataType: "json",
            data: {
                name: $("#staffName").val(),
                staffId: $("#staffId").val(),
                sex: $("#staffSex").val(),
                job: $("#staffJob").val()
            },
            success: function (data) {
                console.log(1);
                if (data.success) {
                    $("#createResult").html(data.msg);
                } else {
                    $("#createResult").html("出现错误:" + data.msg);
                }
            },
            error: function (jqXHR) {
                $("#createResult").html("错误,status:" + jqXHR.status);
            }
        })
    })
    //相似的，如果update的时候发现staffId并不存在，则应该在点击update按钮的时候提醒，直到修改staffId可用为止
    $("#update").click(function () {
        $.ajax({
            type: "POST",
            url: "/update",
            dataType: "json",
            data: {
                name: $("#staffName").val(),
                staffId: $("#staffId").val(),
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
                $("#createResult").html("错误,status:" + jqXHR.status);
            }
        })
    })
})