<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品增加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm">
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="ruleForm.name" clss="input"></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://127.0.0.1:7001/upimg"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :file-list="fileList"
        list-type="picture"
        accept="image/jpeg,image/jpg,image/png"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4MB</div>
      </el-upload>
      <el-form-item label="数量(斤)" prop="number">
        <el-input v-model="ruleForm.number" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="销售类型" prop="Salestype">
        <el-select v-model="ruleForm.Salestype" placeholder="请选择销售类型">
          <el-option label="散装" value="散装"></el-option>
          <el-option label="包装" value="包装"></el-option>
        </el-select>---------
      </el-form-item>
      <el-form-item label="商品类型" prop="Commoditytype">
        <el-select v-model="ruleForm.Commoditytype" placeholder="请选择商品类型">
          <el-option label="肉类" value="肉类"></el-option>
          <el-option label="蔬菜" value="蔬菜"></el-option>
          <el-option label="水果" value="水果"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价(500g/元)" prop="Price">
        <el-input v-model="ruleForm.Price" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="厂址" prop="address">
        <el-input v-model="ruleForm.address" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="厂家联系方式" prop="Phonenumber">
        <el-input v-model="ruleForm.Phonenumber" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="保质期(天)" prop="quality">
        <el-input v-model="ruleForm.quality" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="净含量(g)" prop="NetContent">
        <el-input v-model="ruleForm.NetContent" clss="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        address: '',
        number: '',
        NetContent: '',
        Price: '',
        quality: '',
        Phonenumber: '',
        Salestype: '',
        Commoditytype: '',
        picture: {}
      },
      params: {},
      fileList: [],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        Salestype: [
          { required: true, message: '请选择销售类型', trigger: 'change' }
        ],
        Commoditytype: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        picture: [{required: true, message: '请添加商品图片', trigger: 'blur'}],
        Price: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        address: [
          { required: true, message: '请输入厂家地址', trigger: 'blur' }
        ],
        Phonenumber: [
          { required: true, message: '请输入厂家联系方式', trigger: 'blur' }
        ],
        quality: [
          { required: true, message: '请输入商品保质期', trigger: 'blur' }
        ],
        NetContent: [
          { required: true, message: '请输入净含量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
    },
    handlePreview (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      this.ruleForm.picture = fileList
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (ruleForm) {
      // eslint-disable-next-line eqeqeq
      if (this.ruleForm.picture.forEach == undefined) {
        this.$message({
          message: '请添加商品图片',
          type: 'warning'
        })
      } else {
        this.ruleForm.picture.forEach(el => {
          el.url = el.response
        })
        this.axios({
          method: 'post',
          url: 'http://127.0.0.1:7001/commodity/add',
          data: {
            name: this.ruleForm.name,
            address: this.ruleForm.address,
            number: this.ruleForm.number,
            NetContent: this.ruleForm.NetContent,
            Price: this.ruleForm.Price,
            picture: this.ruleForm.picture,
            Phonenumber: this.ruleForm.Phonenumber,
            Salestype: this.ruleForm.Salestype,
            quality: this.ruleForm.quality,
            Commoditytype: this.ruleForm.Commoditytype
          }
        }).then((res) => {
          if (res.data.code === 1) {
            this.$message({
              message: res.data.msg,
              type: 'success'
            })
            setTimeout(function () {
              location.reload()
            }, 1000)
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
.upload-demo {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  width: 220px;
  margin-bottom: 22px;
  padding-left: 50px;
}
.el-upload-list {
  position: relative;
  left: 165px;
}
</style>
