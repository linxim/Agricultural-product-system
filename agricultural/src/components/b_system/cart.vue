<template>
  <div id="shopcart">
    <div class="head_bg">
      <div class="logo">
        <div class="logo_size">
          <img src="../../../static/img/shopcart_img/logo.png" alt />
        </div>
      </div>
      <ul class="head_nav">
        <li>
          <router-link to="/">
            <span style="color:white">首页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/nav_cart">
            <span style="color:white">购物车</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="centerShop">
      <div class="panel panel-success">
        <div class="panel-body">
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>图片</th>
                <th>商品名称</th>
                <th>商品数量</th>
                <th>商品单价(元)</th>
                <th>商品全部(元)</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="index" class="cart_body">
                <td>
                  <img :src="item.picture[0].url" style="width:98px;height:100px" />
                </td>
                <td class="item_title">
                  <a href>{{item.name}}</a>
                  <!-- <p class="cart_mess">{{item.address}}</p> -->
                </td>
                <td style="width:120px;">
                  <el-button
                    @click="minus(item.number -=1)"
                    :disabled="item.number===1"
                    class="btn-add"
                    circle
                  >-</el-button>
                  {{item.number}}
                  <el-button @click="add(item.number +=1)" class="btn-add" circle>+</el-button>
                </td>
                <td style="width:120px;">&nbsp;&nbsp;{{item.Price}}元/kg</td>
                <td style="width:120px;">&nbsp;&nbsp; {{item.number*item.Price}}元</td>
                <td style="width:120px;">
                  <button type="button" class="btn btn-success btn-sm" @click="addCart(item)">加入购物车</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="block"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      FruitPictureUrl: [],
      tableData: [],
      picture: [],
      searchValue: "",
      username: "",
      onestop: false
    };
  },
  computed: {
    totalCount: function() {
      var n = 0;
      this.tableData.forEach(function(v, i) {
        n += v.number;
      });
      return n;
    }
  },
  mounted() {
    this.getCart();
    this.username = window.sessionStorage.ms_username;
  },
  methods: {
    add: function(i) {
      i++;
    },
    minus: function(i) {
      i--;
    },
    // 请求接口获取ischecked的数据并转换为boolean
    getCart() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/page",
        data: {
          Commoditytype: "水果"
        }
      }).then(res => {
        this.tableData = res.data;
        console.log(this.tableData)
        this.tableData.forEach(el=>{
          el.number = 1;
        })
      });
    },
    //添加到购物车
    addCart(picturedata) {
      console.log(picturedata)
      let $this = this;
      if (window.sessionStorage.length == 0) {
        this.$router.push({ path: "/login" });
      } else {
        this.username = window.sessionStorage.ms_username;
        axios({
          method: "post",
          url: "http://127.0.0.1:7001/shopping/add",
          data: {
            username: this.username,
            name: picturedata.name,
            Img: picturedata.picture[0].url,
            address: picturedata.address,
            number: picturedata.number,
            UnitPrice: picturedata.Price,
            Price: picturedata.Price * 1,
            id: picturedata._id,
          }
        })
          .then(res => {
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
            }else{
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            }
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
@import url("./cart.scss");
</style>