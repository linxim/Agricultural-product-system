<template>
  <el-aside
    width="200px"
    class="box"
  >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link
            to="/index/Userlist"
            class="add"
          >
            <el-menu-item index="2">
              <i class="el-icon-s-order"></i>
              <span slot="title">用户信息</span>
            </el-menu-item>
          </router-link>
          <router-link
            to="/index/Useradd"
            class="add"
          >
            <el-menu-item index="3">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户添加</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-shopping-bag-2"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <router-link
            to="/index/Commoditylist"
            class="add">
            <el-menu-item index="4">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品信息</span>
            </el-menu-item>
          </router-link>
          <router-link
            to="/index/Commodityadd" class="add">
            <el-menu-item index="5">
              <i class="el-icon-sell"></i>
              <span slot="title">商品增加</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <router-link
            to="/index/orderlist"
            class="add">
            <el-menu-item index="6">
              <i class="el-icon-s-goods"></i>
              <span slot="title">订单信息</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>

<style scoped>
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
