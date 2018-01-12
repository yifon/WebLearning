var Staff = require('../models/staff');

//员工的查询，创建，修改 共用一个页面
exports.information = function (req, res) {
    res.render('staff', {
        title: "Ajax全接触"
    })
}

//员工的查询
exports.search = function (req, res) {
    var staffId = req.query.staffId;//获取staffId,再判断staffId是否存在
    var _callback = req.query.callback;
    if (staffId) {
        Staff.findByStaffId(staffId, function (err, staff) {
            if (err) {
                console.log(err);
            }
            if (staff) {
                var data = {
                    "success": true,
                    "msg": "找到员工，员工编号：" + staff.staffId + ",员工姓名：" + staff.name
                };
            } else {
                var data = { "success": false, "msg": "没有找到员工。" };
            }
            if (_callback) {
                res.send(_callback + '(' + JSON.stringify(data) + ')');
            }
            else {
                res.json(data);
            }
        })
    }
}

//员工信息的创建
//由于staffId是唯一的，所以如果创建的时候若发现staffId已经在数据库中创建过，则应该在点击create按钮的时候提醒，直到修改staffId可用为止；
exports.create = function (req, res) {
    var _staff = req.body;
    var _callback = req.query.callback;
    var data;
    if (_staff) {
        Staff.findByStaffId(_staff.staffId, function (err, staff) {
            if (err) {
                console.log(err);
            }
            //用户存在
            if (staff) {
                data = {
                    "success": false,
                    "msg": "该员工编号已被使用过，请使用其它编号！"
                };
                if (_callback) {
                    res.send(_callback + '(' + JSON.stringify(data) + ')');
                }
                else {
                    res.json(data);
                }
            } else {
                var staff = new Staff(_staff);
                staff.save(function (err, staff) {
                    if (err) {
                        console.log(err);
                        data = {
                            "success": false,
                            "msg": "发生错误！"
                        };
                    }
                    else {
                        data = {
                            "success": true,
                            "msg": "创建成功！员工编号：" + staff.staffId + "，姓名：" + staff.name + "，性别：" + staff.sex + "，工作：" + staff.job
                        };
                    }
                    if (_callback) {
                        res.send(_callback + '(' + JSON.stringify(data) + ')');
                    }
                    else {
                        res.json(data);
                    }
                })
            }
        })
    }
}
//员工信息修改
//相似的，如果update的时候发现staffId并不存在，则应该在点击update按钮的时候提醒，直到修改staffId可用为止
exports.update = function (req, res) {
    var _staff = req.body;
    var _callback = req.query.callback;
    var data;
    if (_staff) {
        Staff.findByStaffId(_staff.staffId, function (err, staff) {
            if (err) {
                console.log(err);
            }
            //用户不存在则无法修改
            if (!staff) {
                data = {
                    "success": false,
                    "msg": "该员工编号不存在，请输入正确的员工编号！"
                };
                if (_callback) {
                    res.send(_callback + '(' + JSON.stringify(data) + ')');
                }
                else {
                    res.json(data);
                }
            } else {
                var where = { staffId: _staff.staffId };//要修改的条件
                var updateSet = { $set: { sex: _staff.sex, job: _staff.job, name: _staff.name } };
                Staff.update(where, updateSet, function (err, staff) {
                    if (err) {
                        console.log(err);
                        data = {
                            "success": false,
                            "msg": "发生错误！"
                        };
                    }
                    else {
                        data = {
                            "success": true,
                            "msg": "修改成功！员工编号：" + _staff.staffId + "，姓名：" + _staff.name + "，性别：" + _staff.sex + "，工作：" + _staff.job
                        };
                    }
                    if (_callback) {
                        res.send(_callback + '(' + JSON.stringify(data) + ')');
                    }
                    else {
                        res.json(data);
                    }
                })
            }
        })
    }
}