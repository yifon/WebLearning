window.onload = function () {
    //以下是支持的id名,请根据实际情况做修改
    var supportTxnIds = ["FDK1", "FDK2", "FDK3", "FDK4", "FDK5", "FDK6", "FDK7", "FDK8"];
    var idStrings = supportTxnIds.join(); //转为字符串
    var id = document.getElementById("txnId");
    var confirmId = document.getElementById("confirmId"); //存储值到localStorage
    var delId = document.getElementById("delId"); //清除存储在localStorage中的值
    var check = document.getElementById("check"); //检查输入的结果是否有错误
    var html = "";
    //所有主流浏览器，除了 IE 8 及更早 IE版本
    confirmId.addEventListener("click", function () {
        var txnId = id.value; //输入的id
        //检查id输入是否正确
        console.log(txnId);
        console.log(idStrings.indexOf(txnId))
        if (txnId != "" && idStrings.indexOf(txnId) != -1) {
            localStorage.setItem('txnId', txnId);
        } else {
            html += "输入的id不存在!"
            check.innerHTML = html;
        }
        console.log(localStorage.getItem('txnId'));
    });

    delId.addEventListener("click", function () {
        //清空输入框,并检查id是否存在
        id.value = "";
        console.log(localStorage.getItem('txnId'));
        localStorage.removeItem('txnId');
        console.log(localStorage.getItem('txnId'));
    });
}