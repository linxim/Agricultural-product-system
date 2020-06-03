<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm">
      <!-- 上传图片 -->
    <section>
    <img v-if="!progressFlag" class="head-img" :src="ruleForm.headerimg" />
    <div v-show="progressFlag" class="head-img">
    <el-progress type="circle" :percentage="progressPercent"></el-progress>
    </div>
    <el-upload class="img-btn" action="#"
    :show-file-list="false"  :before-upload="beforeAvatarUpload"
    :http-request="uploadImg">
    <el-button type="success" plain round size="mini" class="imghead">更改头像</el-button>
    </el-upload>
     </section>
      <el-form-item label="用户名" prop="number">
        <el-input v-model="ruleForm.username" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="ruleForm.telephone" clss="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      ruleForm: {
        id: '',
        username: '',
        telephone: '',
        headerimg: ''
      },
      progressFlag: false,
      progressPercent: 0,
      rules: {
      }
    }
  },
  mounted () {
    this.ruleForm.telephone = this.$store.state.iphone
    let str = window.sessionStorage.obj
    let obj = JSON.parse(str)
    this.ruleForm.username = obj.username
    this.ruleForm.id = obj._id
    if (obj.headerimg !== undefined) {
      this.ruleForm.headerimg = obj.headerimg
    } else {
      this.ruleForm.headerimg = this.$store.state.headerimg
    }
    this.ruleForm.telephone = obj.telephone
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (ruleForm) {
      this.axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/admin/update',
        data: {
          id: this.ruleForm.id,
          username: this.ruleForm.username,
          telephone: this.ruleForm.telephone,
          headerimg: this.ruleForm.headerimg
        }
      }).then((res) => {
        if (res.data.code === 1) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          var str = JSON.stringify(this.ruleForm)
          window.sessionStorage.obj = str
          this.$store.commit('setheaderimg', this.ruleForm.headerimg)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleAvatarSuccess (res, file, ruleForm) {
    },
    uploadImg (f) {
      this.progressFlag = true
      let formdata = new FormData()
      formdata.append('image', f.file)
      axios({
        url: 'http://localhost:7001/admin/upheadimg',
        method: 'post',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
        }
      }).then(res => {
        this.ruleForm.headerimg = res.data
        if (this.progressPercent === 100) {
          this.progressFlag = false
          this.progressPercent = 0
        }
      }).then(() => {
      })
    },
    // 上传图片前的过滤
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = (file.size / 1024 / 1024) < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
body > .el-container {
  margin-bottom: 40px;
}
.el-main {
  text-align: left;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-input {
  width: 40%;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-form-item__label {
  padding: 0 5px 0 0;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-upload{
    position: relative;
    left: 205px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .head-img{
    width: 100px;
    height: 100px;
    position: relative;
    left: 200px;
    border-radius: 50%;
  }
</style>
