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
            <div class="grid-content bg-color" id="uisername">
              用&nbsp;户&nbsp;名&nbsp;
              <el-input v-model="data.username" placeholder="请输入用户名" style="width:60%"></el-input>
            </div>
            <br>
            <div class="grid-content bg-color">
              <span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</span>
              <el-input v-model="data.passwd" placeholder="请输入密码" style="width:60%" show-password type="passwrod"></el-input>
            </div>
             <br>
           <div class="grid-content bg-color">
              <span>重复密码</span>
              <el-input v-model="data.checkpass" placeholder="请输入密码" style="width:60%" show-password type="passwrod"></el-input>
            </div>
             <br>
            <div class="grid-content bg-color">
            <span>验证码</span>
            <el-input v-model="uercode" placeholder="请输入验证码" style="width:37%"></el-input>
            <div v-html="imgUrl" class="code" v-cloak @click="code">{{ imgUrl }}</div>
            </div>
           <el-button type="primary" @click="reg" :plain="true">注册</el-button>
           <router-link to="/login"><el-button type="primary" :plain="true">登录</el-button></router-link>
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
  created () {
    this.code()
  },
  data () {
    return {
      data: {
        username: '',
        passwd: '',
        checkpass: ''
      },
      newcode: '',
      imgUrl: '',
      uercode: ''
    }
  },
  methods: {
    reg () {
      this.uercode = this.uercode.toLowerCase()
      if (this.data.username === '' && this.data.passwd === '' && this.data.checkpass === '') {
        this.$message({
          message: '输入框为空，请输入用户名和密码',
          type: 'warning'
        })
      } else if (this.data.passwd !== this.data.checkpass) {
        this.$message({
          message: '请重新确认密码，两次输入密码不一致',
          type: 'warning'
        })
      } else if (this.uercode !== this.newcode) {
        this.$message({
          message: '验证码错误',
          type: 'warning'
        })
      } else {
        axios({
          method: 'post',
          url: 'http://127.0.0.1:7001/user/reg',
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
            this.$router.push('/login')
          } else {
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
<style>
    @import url('./reg.scss');
</style>