//使用serialize()方法序列化表单元素值
$(function () {
    $("#load").bind("click", function () {
        $("#sResult").html($("form").serialize());
    })
})