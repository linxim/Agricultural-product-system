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
    <div class="con_buy_title">
      每日特价
      <p>距结束 {{hr}}:{{min}}:{{sec}}</p>
    </div>
    <div class="con_buy_head1">
      <ul class="timeline_list"></ul>
    </div>
    <div class="con_buy_goodlist">
      <ul class="con_buy_mod_bg" >
        <li class="con_buy_mod_goods" v-for="(item,index) in list" :key="index">
          <div class="con_buy_image">
            <img :src="item.img" alt />
            <h4>{{item.name}}</h4>
            <p>{{item.discounts}}</p>
          </div>
          <div class="con_buy_mod_price">
            <i style="color:red;font-size:20px;">
              ${{item.price}}
              <span style="color: #999;">
                <del>${{item.original}}</del>
              </span>
            </i>
            <el-button type="danger">立即抢购</el-button>
          </div>
        </li>
      
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          img: "../../../../static/img/con_buy_img/con_buy1.jpg",
          name: "李子",
          discounts: "满50减2元",
          price: 29,
          original: 60
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy2.jpg",
          name: "高山香甜大香蕉",
          discounts: "满29元减7.1元",
          price: 29.9,
          original: 151
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy3.jpg",
          name: "东方蜜瓜",
          discounts: "",
          price: 8.9,
          original: 10
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy4.jpg",
          name: "广西百香果",
          discounts: "满29.8元减10元;满31.9元减12元",
          price: 13.6,
          original: 58
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy5.jpg",
          name: "四川枇杷果3斤",
          discounts: "",
          price: 55,
          original: 98
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy6.jpg",
          name: "海南红心火龙果5斤装",
          discounts: "满39元 减10元",
          price: 39.8,
          original: 58
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy7.jpg",
          name: "9斤脐橙中华红橙",
          discounts: "满50减2元",
          price: 43.8,
          original: 108
        },
        {
          img: "../../../../static/img/con_buy_img/con_buy8.jpg",
          name: "诏安青梅果5斤",
          discounts: "满39元 减9元",
          price: 39.8,
          original: 41
        }
      ],
      username: "登录",
      hr: 0,
      min: 0,
      sec: 0,
      overtime: [8, 10, 12, 15]
    };
  },
  mounted() {
    this.countdown();
  },
  methods: {
    countdown() {
      var today = new Date();
      this.hr = 24 - today.getHours();
      this.min = 60 - today.getMinutes();
      this.sec = 60 - today.getSeconds();
      const that = this;
      setTimeout(function() {
        that.countdown();
      }, 1000);
    },
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
  }
};
</script>
<style scoped>
@import url("./con_buy.scss");
</style>