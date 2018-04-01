const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const Multer = require("multer");//上传文件模块,不处理multipart/form-data数据格式以外的任何形式的数据
const path = require("path");
const fs = require("fs");

server.use(Multer({ dest: "./img" }).any());//存放数据的位置
// server.use(bodyParser.urlencoded({}));//不传参的话代表什么数据都接

server.listen(2133);

var usere = {
    leo: "111"
}

server.use("/addPic", (req, res) => {
    console.log(req.files[0]);
    var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
    //修改文件名称，可更改文件的存放路径。fs.rename(oldPath, newPath, [callback(err)])
    fs.rename(req.files[0].path, newName, (err) => {
        if (err) {
            res.send({ ok: 0, msg: "写入失败" });
        } else {
            res.send({ ok: 1, msg: "上传成功", dataUrl: newName });
        }
    })
})

server.post("/loginPost", (req, res) => {
    if (user[req.body.user] == req.body.pass) {
        res.send({ ok: 1, msg: "登陆成功" });
    } else {
        res.send({ ok: 0, msg: "登陆失败" });
    }
})
server.use("/login", (req, res) => {
    if (user[req.query.user] == req.query.pass) {
        res.send({ ok: 1, msg: "登陆成功" });
    } else {
        res.send({ ok: 0, msg: "登陆失败" });
    }
})

//通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
server.use("", express.static("./"));