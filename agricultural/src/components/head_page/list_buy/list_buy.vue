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
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="所有订单">
        <el-table :data="list" style="width: 100%">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.Img" style="width:60px;height:60px;" />
            </template>
          </el-table-column>
          <el-table-column width="300" label="收货地址">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Price" label="单价" width="180"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column label="实付款">
            <template slot-scope="scope">
              <span>￥{{scope.row.number*scope.row.Price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单日期">
            <template slot-scope="scope">
              <div
                style="margin-left: 10px"
                class="list_buy_date"
              >{{ scope.row.date| timeDateFormat}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="待发货">
        <span slot="label">
          待发货
        </span>
        <el-table :data="list" style="width: 100% text-">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.Img" style="width:60px;height:60px;" />
            </template>
          </el-table-column>
          <el-table-column width="300" label="收货地址">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Price" label="单价" width="180"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column label="实付款">
            <template slot-scope="scope">
              <span>￥{{scope.row.number*scope.row.Price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单日期">
            <template slot-scope="scope">
              <div
                style="margin-left: 10px"
                class="list_buy_date"
              >{{ scope.row.date| timeDateFormat}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="已发货">
        <span slot="label">
          已发货
        </span>
        <el-table :data="list" style="width: 100%">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.Img" style="width:60px;height:60px;" />
            </template>
          </el-table-column>
          <el-table-column width="300" label="收货地址">
          <span style="margin-left: 10px" slot-scope="scope">{{ scope.row.address }}</span>
          </el-table-column>
          <el-table-column prop="Price" label="单价" width="180"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column label="商品操作">
            <span>退货/退款</span>
          </el-table-column>
          <el-table-column label="实付款">
            <template slot-scope="scope">
              <span>￥{{scope.row.number*scope.row.Price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单日期">
            <template slot-scope="scope">
              <div
                style="margin-left: 10px"
                class="list_buy_date"
              >{{ scope.row.date| timeDateFormat}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="已到货">
        <span slot="label">
          已到货
        </span>
        <el-table :data="list" style="width: 100%">
          <el-table-column label="商品名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.Img" style="width:60px;height:60px;" />
            </template>
          </el-table-column>
          <el-table-column width="300" label="收货地址">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Price" label="单价" width="180"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column label="实付款">
            <template slot-scope="scope">
              <span>￥{{scope.row.number*scope.row.Price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单日期">
            <template slot-scope="scope">
              <div
                style="margin-left: 10px"
                class="list_buy_date"
              >{{ scope.row.date| timeDateFormat}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      activeName: "所有订单",
      list: [],
      //待发货数
      Nav_car_value: 0,
      username: "",
      dialogFormVisible: false,
      value: null
    };
  },
  filters: {
    timeDateFormat: msg => {
      let time = new Date(msg);
      let year = time.getFullYear();
      let month = (time.getMonth() + 1).toString().padStart(2,'0');
      let day = time.getDay().toString().padStart(2, "0");
      let hour = time.getHours().toString().padStart(2, "0");
      let mm = time.getMinutes().toString().padStart(2, "0");
      let ss = time.getSeconds().toString().padStart(2, "0");
      return year + "/" + month + "/" + day + "/" + hour + ":" + mm + ":" + ss;
    }
  },
  mounted() {
    this.username = window.sessionStorage.ms_username;
    this.listShow();
  },
  methods: {
    toLogin() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/userCenter" })
        : this.$router.push({ path: "/login" });
    },
    toNav_car() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/nav_cart" })
        : this.$router.push({ path: "/login" });
    },
    list_buy() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/list_buy" })
        : this.$router.push({ path: "/login" });
    },
    toPage() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/" })
        : this.$router.push({ path: "/login" });
    },
    toList() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/list_buy" })
        : this.$router.push({ path: "/login" });
    },
    listShow() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/order/userlist",
        data: {
          OrderPerson: this.username
        }
      })
        .then(res => {
          this.list = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(tab, event) {
      if (tab.name === "所有订单") {
        axios({
          method: "post",
          url: "http://127.0.0.1:7001/order/list",
          data: {
            OrderPerson: this.username
          }
        })
          .then(res => {
            this.list = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios({
          method: "post",
          url: "http://127.0.0.1:7001/order/type",
          data: {
            username: this.username,
            state: tab.name
          }
        })
          .then(res => {
            console.log(res);
            this.list = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
@import url("./list_buy.scss");
</style>