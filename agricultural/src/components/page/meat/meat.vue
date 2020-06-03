<template>
  <div class="travel">
    <div class="travel-top">
      <div class="travel-logo">
        <img src="@/../static/img/meat_img/meat_title.jpg" alt />
      </div>
      <div class="travel-title">
        <div class="travel-max">{{title}}</div>
        <div class="travel-min">灵魂和身体，总有一个在路上</div>
      </div>
    </div>

    <div class="aim">
      <ul class="list">
        <li class="goods" v-for="(item,value) in meatPictureUrl" :key="value">
          <div class="pic" @click="checkimg">
            <img :src="meatPictureUrl[value].picture[0].url" @click="checkimg($event)" :alt = meatPictureUrl[value]._id />
          </div>
          <el-dialog title="新鲜到家" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <div class="pop_win"  v-for="(item,index) in picturedata.picture" :key = "index">
                <img :src="picturedata.picture[index].url" alt />
              </div>
              <div class="pop_con">
                <div class="title">{{picturedata.name}}</div>
                <p class="price">{{picturedata.Price}}元/500g</p>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addCart(picturedata)">添加购物车</el-button>
            </div>
          </el-dialog>
          <div class="aim-title">
            <p>
              {{item.name}}
              <span>{{item.Price}}元</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  inject: ["reload"],
  data() {
    return {
      picters: [],
      meatPictureUrl: [],
      dialogFormVisible: false,
      title: "肉类",
      picturedata: {},
      pop_show: {
        img: "",
        title: "",
        desc: "",
        price: "",
        NetContent: "",
        Salestype: ""
      },
      formLabelWidth: "120px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {
    this.getFruit();
  },
  methods: {
    getFruit() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/page",
        data: {
          Commoditytype: this.title
        }
      }).then(res => {
        console.log(res)
        this.meatPictureUrl = res.data;
      });
    },
    checkimg(event) {
      console.log(this.picturedata)
      let $this = this;
      let thisimgalt = event.currentTarget;
      let pictureID = thisimgalt.alt;
      $this.dialogFormVisible = true;
      $this.meatPictureUrl.forEach((item,index)=>{
        if(item._id == pictureID ){
        $this.picturedata = item;
         return;
        }
      })
    },
    addCart(picturedata) {
      let $this = this;
      if (window.sessionStorage.length == 0) {
        this.$router.push({ path: "/login" });
      } else {
        this.username = window.sessionStorage.ms_username;
        axios({
        method: "post",
        url: "http://127.0.0.1:7001/shopping/add",
        data: {
          id: picturedata._id,
          username: this.username,
          name: picturedata.name,
          Img: picturedata.picture[0].url,
          address: picturedata.address,
          number: 1,
          UnitPrice: picturedata.Price,
          Price: picturedata.Price * 1
        }
      }).then(res => {
          this.dialogFormVisible = false;
        })
        .catch(err => {
          console.log(err)
        });
      }
    }
  }
};
</script>
<style >
@import "./meat.scss";
</style>