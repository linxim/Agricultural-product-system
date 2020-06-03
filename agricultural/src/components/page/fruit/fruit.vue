
<template>
  <div>
    <div class="travel">
      <div class="travel-top">
        <div class="travel-logo">
          <img src="../../../../static/img/rests_img/fruits_title.jpg" alt />
        </div>
        <div class="travel-title">
          <div class="travel-max">{{fruit}}</div>
          <div class="travel-min" style="display:flex;justify-content:space-between;">
            <div>
              <span>
                <i class="iconfont icon-shuiguopingguo"></i>
              </span>
              <span>
                <i class="iconfont icon-lizi"></i>
              </span>
              <span>
                <i class="iconfont icon-yingtao"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="travel-conter">
        <div class="img-left">
          <div class="big-img">
            <img :src="FruitPictureUrl[1].picture[0].url" @click="checkimg($event)" :alt="FruitPictureUrl[1]._id" />
            <span class="img-name">{{FruitPictureUrl[1].name}}</span>
          </div>
          <div class="litter-box">
            <div class="litter-img">
              <img
                :src="FruitPictureUrl[4].picture[0].url"
                @click="checkimg($event)"
                :alt="FruitPictureUrl[4]._id"
              />
              <span class="img-name">{{FruitPictureUrl[4].name}}</span>
            </div>
            <div class="litter-img">
              <img
                :src="FruitPictureUrl[3].picture[0].url"
                @click="checkimg($event)"
                :alt="FruitPictureUrl[3]._id"
              />
              <span class="img-name">{{FruitPictureUrl[3].name}}</span>
            </div>
          </div>
        </div>
        <div class="img-right">
          <div class="litter-box">
            <div class="litter-img">
              <img
                :src="FruitPictureUrl[5].picture[0].url"
                @click="checkimg($event)"
                :alt="FruitPictureUrl[5]._id"
              />
              <span class="img-name">{{FruitPictureUrl[5].name}}</span>
            </div>
            <div class="litter-img">
              <img
                :src="FruitPictureUrl[6].picture[0].url"
                @click="checkimg($event)"
                :alt="FruitPictureUrl[6]._id"
              />
              <span class="img-name">{{FruitPictureUrl[6].name}}</span>
            </div>
          </div>
          <div class="big-img">
            <img
              :src="FruitPictureUrl[7].picture[0].url"
              @click="checkimg($event)"
              :alt="FruitPictureUrl[7]._id"
            />
            <span class="img-name">{{FruitPictureUrl[7].name}}</span>
          </div>
          <!--详情页弹窗-->
          <el-dialog title="新鲜到家" :visible.sync="dialogFormVisible">
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
      fruit: "水果",
      FruitPictureUrl: [],
      picturedata: {
        picture:[]
      },
      username: "",
      dialogFormVisible: false,
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
    if(window.sessionStorage.length!=0){
      this.username = window.sessionStorage.getItem("ms_username");
    }
  },
  methods: {
    getFruit() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/page",
        data: {
          Commoditytype: "水果"
        }
      }).then(res => {
        this.FruitPictureUrl = res.data;
      });
    },
    checkimg(event) {
      let $this = this;
      let thisimgalt = event.currentTarget;
      let pictureID = thisimgalt.alt;
      $this.dialogFormVisible = true;
      $this.FruitPictureUrl.forEach((item, index) => {
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
<style  scoped>
@import "./fruit.scss";
@import url("//at.alicdn.com/t/font_1677509_ru4l794wd4.css");
</style>
