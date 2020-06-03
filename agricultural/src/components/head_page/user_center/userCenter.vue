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
        <div>{{username}}</div>
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
    <div class="userContent">
      <h3>个人信息</h3>
      <div>
        <section>
          <img v-if="!progressFlag" style="width:60px;height:60px;" :src="form.headerimg" />
          <div class="username">
            <span class="username_style">用户名:{{form.username}}</span>
          </div>
          <a @click="edit" class="edit">编辑</a>
          <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="用户名称">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="用户密码">
                <el-input v-model="form.passwd"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="form.telephone"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button plain @click="updateUserData()">保存</el-button>
            </div>
          </el-dialog>
          <div v-show="progressFlag" class="head-img">
            <el-progress type="circle" :percentage="progressPercent"></el-progress>
          </div>
          <el-upload
            class="img-btn"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImg"
          >
            <el-button type="success" plain round size="mini" class="imghead">更改头像</el-button>
          </el-upload>
        </section>
      </div>
      <tr></tr>
      <br/>
      <div style="width:900px;border-bottom:1px solid #BCBCB3;"></div>

      <h3>收货地址</h3>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="详细地址:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"
            v-model="form.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人:">
          <el-input v-model="form.cname" placeholder="长度不超过25字符"></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="checked">设置为默认收货地址</el-checkbox>
      <hr />
      <el-button plain @click="updateUserData()">保存</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      form: {},
      username: "",
      progressFlag: false,
      progressPercent: 0,
      dialogFormVisible: false,
      textarea: "",
      //默认收货地址
      checked: false
    };
  },
  mounted() {
    this.form = JSON.parse(window.sessionStorage.getItem("obj"))
    this.getUserData();
    // this.getaddress();
  },
  methods: {
    edit() {
      this.dialogFormVisible = true;
    },
    toPage() {
      let username = sessionStorage.getItem("ms_username");
      let self = this;
      username
        ? self.$router.push({ path: "/" })
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
    getUserData() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/user/find",
        data:{
          id: this.form._id
        }
      }).then(res => {
        console.log(res)
        this.form = res.data[0]
      });
    },
    updateUserData() {
      axios({
        method: "post",
        url: "http://127.0.0.1:7001/user/update",
        data: {
          id: this.form._id,
          username: this.form.username,
          address: this.form.address,
          passwd: this.form.passwd,
          cname: this.form.cname,
          telephone: this.form.telephone,
          headerimg: this.form.headerimg
        }
      }).then(res=>{
        if(res.data.code==1){
          this.$notify({
            title: "成功",
            message: "保存成功",
            type: "success"
          });
          window.sessionStorage.obj = {}
          window.sessionStorage.setItem("obj",JSON.stringify(this.form))
          this.dialogFormVisible = false;
        }else{
            this.$notify({
            title: "失败",
            message: res.data.msg,
            type: "warning"
          });
        }
      })
    },
    uploadImg(f) {
      this.progressFlag = true;
      let formdata = new FormData();
      formdata.append("image", f.file);
      axios({
        url: "http://localhost:7001/user/upheadimg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: progressEvent => {
          this.progressPercent =
            (progressEvent.loaded / progressEvent.total) * 100;
        }
      })
        .then(res => {
          this.form.headerimg = res.data;
          if (this.progressPercent === 100) {
            this.progressFlag = false;
            this.progressPercent = 0;
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // getaddress(){
    //   if(window.sessionStorage.obj.address==undefined){
    //             this.$notify({
    //             title: "提示",
    //             message: "请填写个人地址",
    //             type: "warring"
    //         });
    //   }
    // }
  }
};
</script>

<style scoped>
@import url("./userCenter.scss");
</style>