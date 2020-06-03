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
    <div class="box1" v-if="tableData.length">
      <h2>购物车</h2>
      <div class="panel-body">
        <div class="table table-condensed">
          <div>
            <div class="title1">
              <span>商品图片</span>
              <span>商品名称</span>
              <span>数量</span>
              <span>单价</span>
              <span>操作</span>
            </div>
          </div>
          <div>
            <div v-for="(item,index) in tableData" :key="index">
              <div>
                <shop-item
                  ref="shopc"
                  :shopobject="item"
                  @getshop="thisgetshop"
                  @getprice="priceg"
                  @deleteon="thisnext"
                ></shop-item>
              </div>
            </div>
            <div>
              <span colspan="6" >  {{this.fruitIds.length}} 件商品总计(不含运费):{{countmoney | numFilter}}</span>
              <el-button type="danger" @click="dialogVisible=true">结算</el-button>
              <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <p>支付：{{countmoney | numFilter(2)}}</p>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="pay()">确 定</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 v-else class="h2">购物车为空请挑选商品吧</h2>
  </div>
</template>
<script>
import axios from "axios";
import shopItem from "./shopItem";
export default {
  components: {
    shopItem
  },
  data() {
    return {
      name: "",
      tableData: [],
      searchValue: "",
      dialogVisible: false,
      fruitIds: [],
      // 初始化全选按钮, 默认不选
      isCheckedAll: false,
      address: "",
      n: 0, // 购物车总数
      //总价
      contprice: [],
      totalPrice: 0,
      //系统时间
      systemDate: "",
      // Nowcontprice:0,
      indexshopcar: null,
      shopcaritem: [],
      pricearr: [0],
      gets: [],
      countmoney: 0,
      getpricemoney: null,
      getpricemoney: [],
      nallmoney: [],
      flooat: [],
      init : 0
    };
  },

  watch: {
    shopcaritem: {
      handler(newval, oldval) {
        // this.indexshopcar
        let arrcont = 0;
        // console.log(newval.number)
        let pric = newval.UnitPrice * newval.number;
        this.pricearr[this.indexshopcar] = pric;
        this.totalPrice = this.cotarr(this.pricearr);
      },
      deep: true
    }
  },
  filters: {
    numFilter: function(data, n) {
      return "¥" + data.toFixed(n);
    }
  },
  computed: {
    username() {
      let username = window.sessionStorage.getItem("ms_username");
      return username ? username : this.name;
    }
  },
  mounted() {
    this.getCart();
    let obj = JSON.parse(window.sessionStorage.obj);
    this.address = obj.address;
  },
  methods: {
    //删除购物车
    thisnext(data) {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/shopping/delete",
        data: {
          _id: data
        }
      }).then(response => {
        axios({
          method: "post",
          url: "http://127.0.0.1:7001/shopping/list",
          data: {
            username: this.username
          }
        }).then(response => {
          this.tableData = response.data;
          $this.tableData.forEach((el, index) => {
            el.keyid = index;
          });
        });
      });
      this.getCart();
    },
    priceg(data, index) {
      let $this = this;
      if ($this.flooat[index]) {
        // $this.nallmoney = [0];
        $this.countmoney = 0;
        $this.nallmoney[index] = data;
        $this.nallmoney.forEach((el, i) => {
          if ($this.flooat[i]) {
            $this.countmoney += el;
          } else {
            return;
          }
        });
      } else {
        return;
      }
    },
    thisgetshop(data, price, index,obj) {
      let $this = this;
      this.flooat[index] = data;
      if (data == false) {
        this.fruitIds.splice(index,1)
        this.countmoney -= price;
        console.log(this.fruitIds)
        if (this.countmoney <= 0) {
          this.countmoney = 0;
        }
      } else {
        this.fruitIds.push(obj);
        console.log(this.fruitIds)
        $this.countmoney += $this.nallmoney[index];
      }
    },
    contchange(value, value2) {
      // console.log(this)
    },
    cotarr(arr) {
      let cont = 0;
      for (let i = 0; i < arr.length; i++) {
        cont += arr[i];
      }
      return cont;
    },
    getCart() {
      let $this = this;
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/shopping/list",
        data: {
          username: this.username
        }
      }).then(response => {
        $this.tableData = response.data;
        $this.tableData.forEach((el, index) => {
          $this.nallmoney.push(0);
          el.keyid = index;
        });
      });
    },
    checkedOne(res, item, index) {
      this.shopcaritem = item;
      this.indexshopcar = index;
      // this.Nowcontprice = parseInt(this.$refs.table[index].children[5].innerHTML.substr(1))
      // // console.log(this.Nowcontprice)
      let pricesall = 0;
      if (res.target.checked == true) {
        this.fruitIds.push(item);
        this.n=this.n+1;
        console.log(this.n);
        // pricesall = item.UnitPrice*item.number
        this.totalPrice += this.cotarr(this.pricearr);
        // totalPrice;
      } else {
        this.shopcaritem.number = 0;

        let index = this.fruitIds.findIndex(n => {
          return item._id === n._id;
        });
        this.fruitIds.splice(index, 1);
        this.pricearr[index] = 0;
        this.totalPrice = this.cotarr(this.pricearr);
        this.n--;
      }
    },
    toPage() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/" })
        : this.$router.push({ path: "/login" });
    },
    toLogin() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/userCenter" })
        : this.$router.push({ path: "/login" });
    },
    toList() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/list_buy" })
        : this.$router.push({ path: "/login" });
    },
    toNav_car() {
      let username = sessionStorage.getItem("ms_username");
      username
        ? this.$router.push({ path: "/nav_cart" })
        : this.$router.push({ path: "/login" });
    },
    open() {
      this.$confirm("确定是否购买", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "购买成功!"
          });
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //支付
    pay() {
      let obj = JSON.parse(window.sessionStorage.getItem("obj"));
      if (obj.address == undefined) {
        this.$router.push("/userCenter");
      } else if (this.fruitIds.length != 0) {
        this.fruitIds.forEach(el => {
          axios({
            method: "post",
            url: "http://127.0.0.1:7001/commodity/Stock",
            data: {
              id: el.id,
              number: el.number
            }
          })
            .then(res => {
              if (res.data.code != 0) {
                axios({
                  method: "post",
                  url: "http://127.0.0.1:7001/order/add",
                  data: {
                    OrderPerson: this.username,
                    Img: el.Img,
                    name: el.name,
                    address: this.address,
                    number: el.number,
                    UnitPrice: el.UnitPrice,
                    Price: el.Price
                  }
                }).then(res => {
                  if (res.data.code == 1) {
                    this.$notify({
                      title: res.msg,
                      message: "祝您购物愉快",
                      type: "success"
                    });
                    axios({
                      method: "post",
                      url: "http://127.0.0.1:7001/shopping/delete",
                      data: {
                        _id: el._id
                      }
                    }).then(res => {
                      axios({
                        method: "post",
                        url: "http://127.0.0.1:7001/shopping/list",
                        data: {
                          username: this.username
                        }
                      }).then(response => {
                        response.data.forEach(el => {
                          el.number = 1;
                        });
                        this.tableData = response.data;
                        $this.tableData.forEach((el,index)=>{
         el.keyid = index
       })
                      });
                    });
                  } else {
                    this.$notify({
                      title: res.msg,
                      message: "有问题请联系客服哦",
                      type: "warring"
                    });
                  }
                });
              } else if (res.data.code == 0) {
                this.$notify({
                  title: "警告",
                  message: res.data.msg,
                  type: "warring"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      }
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
@import url("./nav_cat.scss");
</style>