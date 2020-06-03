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
      <el-menu-item index="0" style="left:0;position:absolute;">{{welcome}}</el-menu-item>
      <el-menu-item index="1">
        <div @click="toLogin">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">{{username}}</span>
            <el-dropdown-menu slot="dropdown" v-if="username!='登录'">
              <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item command="loginout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu-item>

      <el-menu-item index="3">
          <div @click="toNav_car">购物车</div>
      </el-menu-item>

      <el-menu-item index="4">
        <div @click="toList">订单管理</div>
      </el-menu-item>
    </el-menu>
    <div class="line"></div>

    <div class="block">
      <el-carousel style="height:340px;border-radius:10px;width:100%;">
        <el-carousel-item v-for="item in imgs" :key="item.key">
          <img :src="item.img" alt class="pictuer" style="width:100%;height:100%;" />
        </el-carousel-item>
      </el-carousel>
    </div>

      <el-row>
        <el-col :span="8">
          <div class="grid-content fea-text">
            <router-link to="/cart" style="text-decoration:none;">
              <i class="el-icon-sold-out"></i>
              <span style="color:white;">一键购物方式</span>
            </router-link>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content fea-text">
            <router-link to="/fresh" style="text-decoration:none;">
              <span style="color:white;">关于我们</span>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "登录",
      activeIndex: "1",
      activeIndex2: "1",
      Nav_car_value: 0,
      welcome: "欢迎来到这个网页，我们将为您提供全方位服务",
      imgs: [
        {
          img: "../../../static/img/head_img/head_1.jpg"
        },
        {
          img: "../../../static/img/head_img/head_2.jpg"
        },
        {
          img: "../../../static/img/head_img/head_3.jpg"
        }
      ],
      options: [],
      value: [],
      loading: false,
      list: []
    };
  },
  computed: {
    username() {
      let username = sessionStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  mounted() {
    setInterval(() => {
      var start = this.welcome.substring(0, 1);
      // 获取到第一个字符
      var end = this.welcome.substring(1);
      this.welcome = end + start;
    }, 400);
    // this.setNav_car_value();
  },
  methods: {
    handleCommand(command) {
      if (command == "loginout") {
        window.sessionStorage.clear()
        this.$router.push({ path: "/login" });
      } else if (command == "userCenter") {
        this.$router.push({ path: "/userCenter" });
      }
    },
    toLogin() {
      let username = sessionStorage.getItem("ms_username");
      let self = this;
      username
        ? self.$router.push({ path: "/userCenter" })
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
    },
    handleSelect(key, keyPath) {}
  }
};
</script>
<style scoped>
.pageheader > ul > li {
  float: right;
}
.el-menu-demo-underline > .el-menu-item:hover {
  border-bottom-color: #eef1f6 !important;
  color: #48ba9e;
}
.fea-text {
  margin: 10px;
  width: 500px;
  background-color: #4cedc6;
  font-size: 25px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  position: relative;
  left: 260px;
}
.item {
  position: relative;
  float: left;
  height: 50px;
  line-height: 20px;
  margin-top: 20px;
}
.select_find {
  position: relative;
  width: 331px;
  height: 70px;
  margin: 0 auto;
}
.btn_select_find {
  background-color: #4cedc6;
  display: inline-block;
  border-color: #4cedc6;
}
.block {
  width: 100%;
}
.multi-function{
  margin: auto;
}
.el-row{
  margin: auto;
  display: block;
  text-align: center;
}
</style>
