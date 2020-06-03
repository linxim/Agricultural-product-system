<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:10px"  mode="out-in">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
      v-loading="loading"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%">
      <el-table-column
        prop="_id"
        label="id"
        width="220">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="厂家地址">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量(斤)"
        width="60">
      </el-table-column>
      <el-table-column
        prop="number"
        label="单价(g)"
        width="60">
      </el-table-column>
      <el-table-column
        prop="quality"
        label="保质期"
        width="50">
      </el-table-column>
      <el-table-column
        prop="Phonenumber"
        label="厂家联系方式"
        width="130">
      </el-table-column>
      <el-table-column
        prop="Salestype"
        label="保质期">
      </el-table-column>
      <el-table-column
        label="添加日期"
        width="210">
        <template slot-scope="scope">
        <div>{{scope.row.date | timeDateFormat}}</div>
        </template>
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
  filters: {
    timeDateFormat: msg => {
      let time = new Date(msg)
      let year = time.getFullYear()
      let month = (time.getMonth() + 1).toString().padStart(2, '0')
      let day = time.getDay().toString().padStart(2, '0')
      let hour = time.getHours().toString().padStart(2, '0')
      let mm = time.getMinutes().toString().padStart(2, '0')
      let ss = time.getSeconds().toString().padStart(2, '0')
      return year + '/' + month + '/' + day + '/' + hour + ':' + mm + ':' + ss
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/commodity/list'
      }).then((res) => {
        this.loading = false
        this.time(res)
        this.tableData = res.data
        this.current = res.data.length
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClick (row) {
      console.log(row)
    },
    time (data) {
      console.log(data)
    },
    delet (row) {
      console.log(row)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:7001/comodity/delete',
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
      this.$store.commit('setlist', row)
      this.$router.push({path: '/index/Commodityupdata'})
    },
    current_change (currentPage) {
      this.currentPage = currentPage
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>

<style>
.block{
  text-align: center;
}
</style>
