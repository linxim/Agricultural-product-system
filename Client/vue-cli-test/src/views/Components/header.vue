<template>
  <div id="header">
    <el-header>
      <span class="title">农产品批发管理系统</span>
      <el-dropdown trigger="click" >
        <el-avatar
          :size="50"
          @error="errorHandler"
          class="header"
        >
        <img :src="headerimg()">
        </el-avatar>
        <el-dropdown-menu slot="dropdown">
          <router-link class="text"  :to="tabledata[0].path"><el-dropdown-item icon="el-icon-s-custom">{{tabledata[0].name}}</el-dropdown-item></router-link>
          <el-dropdown-item icon="el-icon-switch-button" @click.native="loginout()">{{tabledata[1].name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tabledata: [
        { name: '用户信息', path: '/index/users' },
        { name: '安全退出', path: '/login' }
      ]
    }
  },
  methods: {
    errorHandler () {
      return true
    },
    loginout () {
      window.sessionStorage.clear()
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({ path: '/login' })
    },
    headerimg () {
      let str = window.sessionStorage.obj
      let obj = JSON.parse(str)
      if (obj.headerimg !== undefined) {
        this.$store.state.headerimg = obj.headerimg
        return this.$store.state.headerimg
      } else {
        return this.$store.state.headerimg
      }
    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #696969;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.header {
  position: absolute;
  right: 100px;
  top: 5px;
  display: inline-block;
  cursor: pointer;
}
.title {
  font-family: 幼圆;
  font-size: 25px;
  font-weight: bold;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-dropdown {
  position: relative;
  left: 50px;
}
#dropdown-menu-4709 {
  display: inline-block;
}
.el-dropdown {
  position: static;
  left: 0px;
  display: block;
}
.text{
  text-decoration: none;
}
</style>
