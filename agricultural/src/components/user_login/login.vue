<template>
  <div class="body">
    <div class="box">
      <div class="title">
        <span class="title">用户登录界面</span>
      </div>
      <form action>
        <div class="input">
          <el-row :gutter="20">
            <el-col>
              <div class="grid-content bg-color" id="uisername">
                用户名
                <el-input v-model="data.username" placeholder="请输入用户名" style="width:60%"></el-input>
              </div>
              <br />密&nbsp;&nbsp;&nbsp;码
              <el-input
                v-model="data.passwd"
                placeholder="请输入密码"
                style="width:60%"
                type="password"
                show-password
              ></el-input>
              <div class="grid-content bg-color">
                <span>验证码</span>
                <el-input v-model="uercode" placeholder="请输入验证码" style="width:37%"></el-input>
                <div v-html="imgUrl" class="code" v-cloak @click="code">{{ imgUrl }}</div>
              </div>
              <el-button type="primary" @click="login" :plain="true">登录</el-button>
              <router-link to="/register">
                <el-button type="primary" :plain="true">注册</el-button>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.code();
  },
  data() {
    return {
      data: {
        username: "",
        passwd: ""
      },
      newcode: "",
      imgUrl: "",
      uercode: ""
    };
  },
  methods: {
    login() {
      this.uercode = this.uercode.toLowerCase();
      if (this.data.username === "" && this.data.passwd === "") {
        this.$message({
          message: "输入框为空，请输入用户名和密码",
          type: "warning"
        });
      } else if (this.uercode !== this.newcode) {
        this.$message({
          message: "验证码错误",
          type: "warning"
        });
      } else {
        axios({
          method: "post",
          url: "http://127.0.0.1:7001/user/login",
          data: {
            username: this.data.username,
            passwd: this.data.passwd
          }
        }).then(res => {
            console.log(res);
            if (res.data.code === 1) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              var array = res.data.array[0]
              delete array.passwd
              console.log(array)
              // 将对象转换为字符串
              var str = JSON.stringify(array)
              // 将转换得字符串放入sessionStorage中
              window.sessionStorage.obj = str
              window.sessionStorage.setItem("obj",JSON.stringify(res.data.array[0])
              );
              this.$router.push({ path: "/" });
              sessionStorage.setItem("ms_username", this.data.username);
            } else if(res.data.code<1) {
              this.code();
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    code() {
      axios
        .get("http://localhost:7001/verify")
        .then(res => {
          this.imgUrl = res.data.data;
          this.newcode = res.data.text.toLowerCase();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style>
@import "./login.scss";
</style>