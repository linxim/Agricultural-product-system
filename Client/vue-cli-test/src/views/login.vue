/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-parsing-error */
<template>
  <div class="body">
    <div class="box">
      <div class="title">
        <span class="title">农产品批发管理系统</span>
      </div>
      <form action="">
        <div class="input">
          <el-row :gutter="20">
            <el-col>
              <div
                class="grid-content bg-purple"
                id="uisername">
                用户名
                <el-input
                  v-model="data.username"
                  placeholder="请输入用户名"
                  style="width:60%"
                ></el-input>
              </div>
              <div class="grid-content bg-purple">
                <span>密<pre></pre>码</span>
                <el-input
                  v-model="data.passwd"
                  placeholder="请输入密码"
                  style="width:60%"
                  show-password
                ></el-input>
              </div>
              <div class="grid-content bg-purple">
                <span>验证码</span>
                <el-input
                  v-model="uercode"
                  placeholder="请输入验证码"
                  style="width:37%"
                ></el-input>
                <div v-html="imgUrl" class="code" v-cloak @click="code">{{ imgUrl }}</div>
              </div>
              <el-button
                type="primary"
                @click="login"
                :plain="true">
                登录</el-button>
              <router-link to="/reg">
                <el-button
                  type="primary"
                  :plain="true"
                >注册</el-button>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.code()
  },
  data () {
    return {
      data: {
        username: '',
        passwd: ''
      },
      newcode: '',
      imgUrl: '',
      uercode: ''
    }
  },
  methods: {
    login () {
      this.uercode = this.uercode.toLowerCase()
      if (this.data.username === '' && this.data.passwd === '') {
        this.$message({
          message: '输入框为空，请输入用户名和密码',
          type: 'warning'
        })
      } else if (this.uercode !== this.newcode) {
        this.$message({
          message: '验证码错误',
          type: 'warning'
        })
      } else {
        this.axios({
          method: 'post',
          url: 'http://127.0.0.1:7001/admin/login',
          data: {
            username: this.data.username,
            passwd: this.data.passwd
          }
        }).then((res) => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            var array = res.data.array[0]
            delete array.passwd
            console.log(array)
            // 将对象转换为字符串
            var str = JSON.stringify(array)
            // 将转换得字符串放入sessionStorage中
            window.sessionStorage.obj = str
            if (res.data.array.telephone !== '') {
              this.$store.commit('setiphone', res.data.array[0].telephone)
            }
            this.$router.push({ path: '/index' })
          } else if (res.data.code < 1) {
            this.code()
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    code () {
      axios.get('http://localhost:7001/verify')
        .then(res => {
          this.imgUrl = res.data.data
          this.newcode = res.data.text.toLowerCase()
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
.body{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #000;
  background-image: url('../assets/bgn.jpg');
  background-size: 100%;
}
.body-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #000;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
pre {
  display: inline-block;
  width: 15px;
}
.title {
  text-align: center;
}
.input {
  text-align: center;
}
.title {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 25px;
}
.el-col-offset-6 {
  margin-left: 15%;
}
.el-input {
  width: 100%;
}
.el-button {
  margin-top: 10px;
}
.box {
  text-align: center;
  width: 450px;
  height: 170px;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
}
.code {
  display: inline-block;
  cursor: pointer;
  position: relative;
  top: 10px;
}
</style>
