import Vue from "vue";
import App from "./app.vue";
import "./assets/styles/global.styl";
const root = document.createElement("div");
document.body.appendChild(root);
new Vue({
    render: (h) => h(App)//组件渲染出的内容就是app的内容
}).$mount(root);//将vue的内容挂载到root上