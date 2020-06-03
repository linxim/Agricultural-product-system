<template>
  <div class="travel">
    <div class="travel-top">
      <div class="travel-logo">
        <img src="@/../static/img/rests_img/vegatable_title.jpg" alt />
      </div>
      <div class="travel-title">
        <div class="travel-max">{{title}}</div>
        <div class="travel-min">白菜</div>
      </div>
    </div>
    <div class="travel-conter">
      <div class="theme-left">
        <div class="theme">
          <img
            :src="VegetablePictureUrl[1].picture[0].url"
            @click="checkimg($event)"
            :alt="VegetablePictureUrl[1]._id"
          />
          <span class="img-name">{{VegetablePictureUrl[1].name}}</span>
        </div>
      </div>
      <div class="theme-right">
        <div class="litter-box">
          <div class="litter-img">
            <img
              :src="VegetablePictureUrl[2].picture[0].url"
              @click="checkimg($event)"
              :alt="VegetablePictureUrl[2]._id"
            />
            <span class="img-name">{{VegetablePictureUrl[2].name}}</span>
          </div>
          <div class="litter-img">
            <img
              :src="VegetablePictureUrl[3].picture[0].url"
              @click="checkimg($event)"
              :alt="VegetablePictureUrl[3]._id"
            />
            <span class="img-name">{{VegetablePictureUrl[3].name}}</span>
          </div>
        </div>
        <div class="litter-box">
          <div class="litter-img">
            <img
              :src="VegetablePictureUrl[0].picture[0].url"
              @click="checkimg($event)"
              :alt="VegetablePictureUrl[0]._id"
            />
            <span class="img-name">{{VegetablePictureUrl[0].name}}</span>
          </div>
          <div class="litter-img" @click="checkimg">
            <img
              :src="VegetablePictureUrl[5].picture[0].url"
              @click="checkimg($event)"
              :alt="VegetablePictureUrl[5]._id"
            />
            <span class="img-name">{{VegetablePictureUrl[5].name}}</span>
          </div><el-dialog title="新鲜到家" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <div class="pop_win" v-for="(item,index) in picturedata.picture" :key="index">
                <img :src="item.url" />
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
        </div>
      </div>
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
      VegetablePictureUrl: [],
      dialogFormVisible: false,
      title: "蔬菜",
      picturedata: {
        picture:[]
      },
      username: "",
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
    this.getVegetables();
  },
  methods: {
    getVegetables() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/page",
        data: {
          Commoditytype: this.title
        }
      }).then(res => {
        this.VegetablePictureUrl = res.data;
      });
    },
    checkimg(event) {
      let $this = this;
      let thisimgalt = event.currentTarget;
      let pictureID = thisimgalt.alt;
      $this.dialogFormVisible = true;
      $this.VegetablePictureUrl.forEach((item, index) => {
        if (item._id == pictureID) {
          $this.picturedata = item;
          return;
        }
      });
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
        })
          .then(res => {
            this.dialogFormVisible = false;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style >
@import "./vegetables.scss";
</style>