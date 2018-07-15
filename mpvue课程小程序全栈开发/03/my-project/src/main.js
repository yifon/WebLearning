import Vue from 'vue';
import App from './App';
Vue.config.productionTip = false;

const app = new Vue(App);
app.$mount();

export default {
  config: {
    page: ['^pages/books/main'],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#000",
      navigationBarTitleText: "蜗牛图书",
      navigationBarTextStyle: "light"
    },
    tabBar: {
      selectedColor: '#EA5149',
      list: [{
        pagePath: 'pages/books/main', //点击后的跳转路径
        list: '图书',
        iconPath: 'static/img/book.png',
        selectedIconPath: 'static/img/book-active.png'
      }, {
        pagePath: 'pages/comments/main', //点击后的跳转路径
        list: '评论',
        iconPath: 'static/img/todo.png',
        selectedIconPath: 'static/img/todo-active.png'
      }, {
        pagePath: 'pages/me/main', //点击后的跳转路径
        list: '我',
        iconPath: 'static/img/me.png',
        selectedIconPath: 'static/img/me-active.png'
      }]
    }
  }
}
