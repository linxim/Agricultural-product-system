<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
      v-loading="loading"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        >
      </el-table-column>
      <el-table-column
        prop="headerimg"
        label="头像">
        <template   slot-scope="scope">
        <img :src="scope.row.headerimg" alt="" class="headerimg">
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="passwd"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="telephone"
        label="手机号">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="updata(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delet(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="current_change"
        :current-page="currentPage"
        :page-sise = 'pagesize'
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: true,
      tableData: [],
      current: 0,
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/user/list'
      }).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.current = res.data.length
        this.tableData.forEach(el => {
          // eslint-disable-next-line eqeqeq
          if (el.headerimg == undefined) {
            el.headerimg = this.$store.state.userheaderimg
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClick (row) {
      console.log(row)
    },
    delet (row) {
      console.log(row)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/user/delete',
        data: {
          id: row._id
        }
      }).then((res) => {
        console.log(res)
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.list()
      }).catch((err) => {
        this.$message({
          message: err.data.error,
          type: 'warning'
        })
      })
    },
    updata (row) {
      this.$store.commit('setuserlist', row)
      this.$router.push({path: '/index/Userupdate'})
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    current_change (currentPage) {
      this.currentPage = currentPage
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style>
.headerimg{
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.block{
  text-align: center;
}
.el-table td, .el-table th{
  text-align: center;
}
</style>
