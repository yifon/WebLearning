// import fs from 'fs'; //node的文件模块，用于将筛选后的数据输出为html
const fs = require('fs');
// import path from 'path'; //node的路径模块，用于处理文件的路径
const path = require('path');

// import superagent from 'superagent'; //客户端请求代理模块
const superagent = require('superagent');

// import eventproxy from 'eventproxy'; //通过事件来决定执行顺序的工具
const eventproxy = require('eventproxy');

const cheerio = require('cheerio');

// import mapLimit from 'async/mapLimit'; //mapLimit用于控制访问频率
const mapLimit = require('async/mapLimit');

/**
 * 将要抓取的页面整理到一个数组里面
 */
let ep = new eventproxy(); //实例化eventproxy
// let baseUrl = 'https://www.douban.com/group/beijingzufang/discussion?start='; //url不变的部分
// let baseUrl = 'https://www.douban.com/group/106955/discussion?start='; //深圳租房
// let baseUrl = 'https://www.douban.com/group/szsh/discussion?start='; //深圳租房
let baseUrl = 'https://www.douban.com/group/futianzufang/discussion?start＝';//深圳福田租房
let pageUrls = []; // 要抓取的页面数组

let page = 20; //抓取页面数量
let perPageQuantity = 25; //每页数据条数

for (let i = 0; i < page; i++) {
    pageUrls.push({
        url: baseUrl + i * perPageQuantity //豆瓣的url数量是25条增长分页的
    });
}
/**
 * 入口函数，访问所有要抓取的页面并保存需要的数据
 */
exports.start = () => {
    // function start() {
    //遍历爬取页面
    const getPageInfo = (pageItem, callback) => {
        //设置访问间隔
        let delay = parseInt((Math.random() * 30000000) % 1000, 10); //0-3秒
        //依次对20个页面发起get请求
        // pageUrls.forEach(pageUrl => {
        // superagent.get(pageUrl.url)
        superagent.get(pageItem.url)
            //模拟浏览器
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36')
            .set('Cookie', 'bid=fAQfJ-6ikoY; ll="118281"; _vwo_uuid_v2=537270C4E579E3C4573DFE266C7B1B7B|3d0ac69f6fb0b4b19fabc3947cc68b1f; viewed="5266847_3590768_4886879"; __utmc=30149280; ap=1; __utmz=30149280.1527603691.31.28.utmcsr=link.juejin.im|utmccn=(referral)|utmcmd=referral|utmcct=/; ps=y; dbcl2="120236393:XSYAAyEQRVY"; ck=T5G5; push_noty_num=0; push_doumail_num=0; __utmv=30149280.12023; __ads_session=yNq5UH7yGgk2LTYTXgA=; ct=y; __utma=30149280.1557863103.1515227691.1527861120.1527867134.34; __utmt=1; __utmb=30149280.30.5.1527867557781')
            //获取到数据后
            .end((err, pres) => {
                let $ = cheerio.load(pres.text); //将页面数据用cheerio处理，生成一个类jQuery对象
                let itemList = $('.olt tbody').children().slice(1, 26); //取出table中的每行数据，并过滤掉表格标题,总共26行，取的是[1,26),即内容的那25行

                //遍历页面中的每条数据
                for (let i = 0; i < itemList.length; i++) {
                    let item = itemList.eq(i).children(); //每个tr下面有4个td,分别为标题，作者，回复数，最后回复时间
                    let a = item.eq(0).children('a'); //标题td下的a
                    let title = a.text() || ''; //获取每个租房信息的标题
                    let url = a.attr('href') || ''; //获取详情页链接
                    // let author = item.eq(1).children('a').attr('href').replace('https://www.douban.com/people', '').replace(/\//g, '') || ''  // 获取作者id
                    let author = item.eq(1).children('a').text() || ''; //作者td下的a的内容，即为作者的昵称
                    let markSum = item.eq(2).text(); //获取回复数
                    let lastModify = item.eq(3).text(); //获取最后修改时间

                    let data = {
                        title,
                        url,
                        author,
                        markSum,
                        lastModify
                    };
                    //ep.emit('事件名称',数据内容)
                    ep.emit('preparePage', data) //每处理完一条数据，便把这条数据通过preparePage事件发送出去，这里主要是起计数的作用
                    // console.log(data)
                }
                //一个页面的数据处理完成后，要调用callback等待执行下一组
                setTimeout(() => {
                    callback(null, pageItem.url);
                }, delay);
            })

        // })
    }


    //通过mapLimit来控制访问频率2，每次并发地处理两个页面的数据，对两个页面的数据用遍历器去处理
    mapLimit(pageUrls, 2, (item, callback) => {
        //并发地取pageUrls数组中的2个页面执行getPageInfo函数，并且一起等待callback完成，再发起下一组(2个)页面的操作
        getPageInfo(item, callback);
    }, err => {
        if (err) {
            console.log(err);
        }
        console.log("抓取完毕");
    })

    /**
     * 判断为中介的过滤策略：
     * 发帖数在抓取的页面中出现超过5次以上
     * 某个帖子的回复量很大，设置阈值为100
     */

    let result = []; //存放最终筛选结果
    let authorMap = {}; //以对象属性的方式，来统计每个人的发帖数
    let intermediary = []; //中介id

    //ep.after('事件名称',数量,事件达到指定数量后的callback()),总共有20*25(页面数*每页数据量)个ep.emit事件都被捕获到以后,才会执行ep.after里面的回调函数
    ep.after('preparePage', pageUrls.length * page, data => {
        //传入不想要出现的关键字，用'|'隔开，比如排除一些位置,排除中介常用短语
        // let filterWords = /找室友|月付|蛋壳|有房出租|合租|宝安|求租/;
        // let filterWords = / /;
        //传入需要筛选的关键词,如没有,可设置为空格
        let keyWords = /转租/;
        //|大门坊|福星路|赤尾|转租/;
        // let keyWords = / /;

        //[先遍历找出中介]先统计每个人的发帖数,并以对象的属性保存,这里利用对象属性名不能重复的特性实现计数
        data.forEach(item => {
            authorMap[item.author] = authorMap[item.author] ? ++authorMap[item.author] : 1;
            if (authorMap[item.author] > 10) {
                intermediary.push(item.author); //如果发现某个人在同一个页面中的发帖数超过5条，则认为是中介
            }
        });
        //数组去重，不同页面可能找到同一个中介
        intermediary = [...new Set(intermediary)];

        //[再遍历过滤掉中介和不想要的关键字帖子]
        data.forEach(item => {
            if (item.markSum > 300) {
                console.log('评论数过多，丢弃');
                return;
            }
            // if (filterWords.test(item.title)) {
            //     console.log('标题带有不希望出现的词语');
            //     return;
            // }
            // if (intermediary.includes(item.author)) {
                // console.log('发帖数过多，怀疑是中介,丢弃');
                // return;
            // }
            //只有经过上面的层层检测，才会来到最后一步
            // if (keyWords.test(item.title)) {
                result.push(item);
            // }
        })

        /**
         * 拿到期望的结果列表后，拼装成html
         */

        //设置html模板
        let top = `
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset='UTF-8'>
            <style>
            .listItem{display:block;margin-top:10px;text-decoration:none;}
            .markSum{color:red;}
            .lastModify{color:'#aaa'}
            </style>
            <title>筛选结果</title>
            </head>
            <body>
            <div>
            `;
        let bottom = `
            </div>
            </body>
            </html>
            `;
        //拼接有效数据html
        let content = ``;
        result.forEach(item => {
            content += `<a class='listItem' href='${item.url}' target='_blank'>${item.title}
                __<span class='markSum'>${item.markSum}</span>
                __<span class='lastModify'>${item.lastModify}</span>`
        });
        let final = top + content + bottom;

        //最后把生成的html输出到指定到文件目录下
        fs.writeFile(path.join(__dirname, '../tmp/result.html'), final, err => {
            if (err) {
                return console.log(err);
            }
            console.log('success');
        });
    });
}

//将入口函数暴露出去
// export default {
//     start
// }
