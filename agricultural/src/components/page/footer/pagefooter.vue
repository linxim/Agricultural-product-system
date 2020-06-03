<template>
  <div>
    <div class="footer-bgc">
        <div>

      <el-row>
        <el-col :span="5">
          <div class="grid-content foot-item-detial">新手指南</div>
          <div class="grid-content ">了解详情</div>
          <div class="grid-content "> <router-link to="/register" style="color:aliceblue;">注册新用户</router-link> </div>

        </el-col>
        <el-col :span="6">
          <div class="grid-content foot-item-detial">采购商服务</div>
          <div class="grid-content ">找供应商</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content foot-item-detial">供应商服务</div>
          <div class="grid-content ">物流服务</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content foot-item-detial">联系客服</div>
          <div class="grid-content ">客服电话:182-235-69963</div>
          <div class="grid-content ">客服QQ:806024160</div>
          <div class="grid-content ">地址:重庆市三峡学院</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content foot-item-detial">投诉举报</div>
        </el-col>

      </el-row>
        </div>
    </div>
  </div>
</template>
<style scoped>
.footer-bgc {
  background-color: #282828;
  width: 100%;
  height: 200px;
}

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    color: aliceblue;
    text-align: center;
    line-height: 36px;
  }
 .grid-content:hover{
     color: #58D0A6;
 }
 .foot-item-detial{
    border-right: 2px solid #ccc;
    width: 100%;
    font-size: 21px;
 }
</style>
