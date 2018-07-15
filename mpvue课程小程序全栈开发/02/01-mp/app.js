//app.js
App({
    //小程序启动后要做的事情
    onLaunch: function () {
        //展示本地存储能力
        var logs = wx.getStorageSync('logs') || []; //获取数据
        logs.unshift(Date.now()); //向日志头添加日期
        wx.setStorageSync('logs', logs); //wx.setStorageSync(key,data),同步存储数据，相同key会覆盖

        //登陆
        wx.login({
            success: res => {
                //发送res.code到后台换取openId,sessionKey,unionId
            }
        })

        //获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    //已经授权，可以直接调用getUserInfo获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            //可以将res发送给后台解码出unionId
                            this.globalData.getUserInfo = res.userInfo;
                            //由于getUserInfo是网络请求，可能会在Page.onLoad之后才返回
                            //所以此处加入callback以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})