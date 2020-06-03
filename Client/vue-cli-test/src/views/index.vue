<template>
  <div class="body-bg">
   <my-header></my-header>
    <el-container style="height:100%">
      <el-container>
        <el-container>
         <my-aside></my-aside>
          <el-container>
            <el-main>
            <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from './Components/header'
import Footer from './Components/footer'
import aside from './Components/aside'
export default {
  data () {
    return {
    }
  },
  components: {
    'my-header': Header,
    'my-footer': Footer,
    'my-aside': aside
  },
  methods: {
  }
}
</script>

<style>
body{
  padding: 0px;
  margin: 0px;
}
.box {
  display: block;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.add{
  text-decoration: none;
}
.input{
  text-align: center;
}
.main-box{
  height: 200px;
}
.body-bg{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}
</style>
