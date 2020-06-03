<template>
  <div id="main">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品修改</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm">
      <el-form-item label="订单账号" prop="OrderPerson">
        <el-input v-model="ruleForm.OrderPerson" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="当前状态" prop="state">
        <el-select v-model="ruleForm.state" placeholder="请选择当前状态">
          <el-option label="待发货" value="待发货"></el-option>
          <el-option label="已发货" value="已发货"></el-option>
          <el-option label="已到货" value="已到货"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收货地址" prop="address">
        <el-input v-model="ruleForm.address" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="厂家联系方式" prop="Phonenumber">
        <el-input v-model="ruleForm.Phonenumber" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="ruleForm.number" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="单价(500g/元)" prop="UnitPrice">
        <el-input v-model="ruleForm.UnitPrice" clss="input"></el-input>
      </el-form-item>
      <el-form-item label="总价格" prop="Price">
        <el-input v-model="ruleForm.Price" clss="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">更改</el-button>
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
        OrderPerson: '',
        name: '',
        address: '',
        number: '',
        UnitPrice: '',
        Price: '',
        Phonenumber: '',
        state: ''
      },
      params: {},
      fileList: [],
      rules: {
        OrderPerson: [
          { required: true, message: '订单账号', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 40, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择收货地址', trigger: 'blur' }
        ],
        UnitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }],
        Phonenumber: [
          { required: true, message: '请输入厂家联系方式', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入当前状态', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    let list = this.$store.state.orderlist
    list.Price = list.UnitPrice * list.number
    this.ruleForm = {...list}
  },
  watch: {
    ruleForm: {
      handler: function () {
        this.ruleForm.Price = this.ruleForm.UnitPrice * this.ruleForm.number
      },
      deep: true
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      this.ruleForm.picture = fileList
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess (response, file, fileList) {
      this.ruleForm.picture = fileList
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    submitForm (ruleForm) {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/order/update',
        data: {
          id: ruleForm._id,
          OrderPerson: ruleForm.OrderPerson,
          name: ruleForm.name,
          address: ruleForm.address,
          number: ruleForm.number,
          UnitPrice: ruleForm.UnitPrice,
          Price: ruleForm.Price,
          Phonenumber: ruleForm.Phonenumber,
          state: ruleForm.state
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code === 1) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.$router.push('/index/orderlist')
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: '请求失败',
          type: 'warning'
        })
        console.log(err)
      })
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
.el-upload-list{
  position: relative;
  left:200px;
}
</style>
