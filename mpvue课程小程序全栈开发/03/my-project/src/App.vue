<script>
  import {
    get
  } from './util';
  export default {
    async created() {
      const res = await get('/weapp/demo');
      console.log("123", res);
      //   //发起一个网络请求
      //   wx.request({
      //     url: config.host + '/weapp/demo',
      //     success: function (res) {
      //       console.log(res);
      //     }
      //   })
      console.log("小程序启动");
    }
  }
</script>
<style>
</style>