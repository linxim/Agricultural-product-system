<template>
  <div class="pageheader">
       <el-menu
      default-active="activeIndex2"
      class="el-menu-demo el-menu-demo-underline"
      mode="horizontal"
      background-color="#0AD6A4"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <div @click="toLogin">{{username}}</div>
      </el-menu-item>

      <el-menu-item index="3">
        <el-badge class="item">
          <div @click="toNav_car">购物车</div>
        </el-badge>
      </el-menu-item>

      <el-menu-item index="4">
        <div @click="toList">订单管理</div>
      </el-menu-item>
      <el-menu-item index="5">
        <div @click="toPage">首页</div>
      </el-menu-item>
    </el-menu>
    <div class="text_content">
      <h1>农产品批发管理系统设计与实现</h1>
      <p style="text-indent:2em;font-size:20px">农产品批发管理系统---专注于农产品的的质量 销售渠道 食品的优惠等开发研究......</p>
      <p style="text-indent:2em;font-size:20px">云计算云服务,<b>pc端登录,远程查账,数据共享</b>。方便客户商品信息查询、下单采购交易服务</p>
      <p style="text-indent:2em;font-size:20px">为用户提供专业化的行业解决方案,充分满足农产品从业者的所需所想。</p>
    </div>
    <div class="slide_images">
      <img src="../../../../static/img/list_img/fresh1.jpg" alt="">
      <img src="../../../../static/img/list_img/fresh2.jpg" alt="">
      <img src="../../../../static/img/list_img/fresh3.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_1.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_2.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_3.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_4.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_5.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_6.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_1.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_2.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_3.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_4.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_5.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_6.jpg" alt="">
      <img src="../../../../static/img/list_img/fresh1.jpg" alt="">
      <img src="../../../../static/img/list_img/fresh2.jpg" alt="">
      <img src="../../../../static/img/list_img/fresh3.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_1.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_2.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_3.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_4.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_5.jpg" alt="">
      <img src="../../../../static/img/fruits_img/fruits_6.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_1.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_2.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_3.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_4.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_5.jpg" alt="">
      <img src="../../../../static/img/list_img/cart_6.jpg" alt="">
    </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "登录",
    };
  },
  methods: {
   toPage() {
      this.$router.push({ path: "/" });
    },
    toLogin() {
      let username = sessionStorage.getItem("ms_username");
      let self = this;
      username
        ? self.$router.push({ path: "/list_buy" })
        : self.$router.push({ path: "/login" });
    },
    toList() {
      let username = sessionStorage.getItem("ms_username");
      let self = this;
      username
        ? self.$router.push({ path: "/list_buy" })
        : self.$router.push({ path: "/login" });
    },
    toNav_car() {
      let username = sessionStorage.getItem("ms_username");
      let self = this;
      username
        ? self.$router.push({ path: "/nav_cart" })
        : self.$router.push({ path: "/login" });
    }
  },
  mounted() {
  }
};
</script>   
<style scoped>
@import url("./fresh.scss");
</style>