//工具函数库

import config from './config';

//创建工具库，处理异步的get请求，需要url
export function get(url) {
  //包装成一个Promise
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code == 0) {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      }
    })
  })
}