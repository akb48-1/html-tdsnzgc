<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="轮播图ID：">
        <el-input v-model="searchForm.banner_id" placeholder="轮播图ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="searchForm.type" class="w140">
          <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in typeList" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchForm.status" class="w140">
          <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in statusList" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="addItem">新增轮播图</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="banner_id" label="轮播图ID" width="100"></el-table-column>
      <el-table-column label="轮播图" width="180">
        <template slot-scope="scope" >
          <img :src="baseURL + scope.row.banner_url" class="table-img">
        </template>
      </el-table-column>
      <el-table-column prop="href" label="目标地址" width="180"></el-table-column>
      <el-table-column label="类型" >
        <template slot-scope="scope" >{{typeList.find(item => item.value === ''+scope.row.type).label }} </template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="createer_name" label="创建人"></el-table-column>
      <el-table-column prop="update_time" label="修改时间"></el-table-column>
      <el-table-column prop="updateer_name" label="修改人"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >{{statusList.find(item => item.value === ''+scope.row.status).label }}</template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
          <el-button @click="editInfo(scope.row)" type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button @click="deleteInfo(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <new-pagination
      :loading="loading"
      class="pdtm10"
      style="text-align: right;"
      ref="pagination"
      @current-change="handleCurrentChange"
    ></new-pagination>

  </div>
</template>

<script>
import { queryBannerByPage, deleteBanner } from '@/http'
import { loadData, confirmWinGen } from "@/decorator";
import { baseURL } from "@/http/axios";

export default {
  
  @loadData([
    
  ])
  data() {
    return {
      baseURL: baseURL,
      searchForm: {
        type: '',
        status: '',
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      statusList: [
        {
          label: '全部',
          value: ''
        }, {
          label: '启用',
          value: '0'
        }, {
          label: '停用',
          value: '1'
        }
      ],
      typeList: [
        {
          label: '全部',
          value: ''
        }, {
          label: '首页',
          value: '0'
        }
      ]
    };
  },
  methods: {
    addItem() {
      this.$router.push({
        name: 'banner-detail',
        params: {
          type: 'add'
        }
      })
    },
    viewDetail(item) {
        console.log(item)
        this.$router.push({
          name: 'banner-detail',
          params: {
            type: 'view'
          },
          query: {
            id: item.banner_id
          }
        })
    },
    editInfo(item) {
      this.$router.push({
        name: 'banner-detail',
        params: {
          type: 'edit'
        },
        query: {
          id: item.banner_id
        }
      })

    },
    @confirmWinGen()
    deleteInfo(item) {
      return deleteBanner(item.banner_id).then(res => {
        this.$message.success(res.message)
        this.queryBannerByPage()
        Promise.resolve()
      })
    },


    handleCurrentChange(pageNo) {
      this.queryBannerByPage()
    },
    formSearch(params = {}) {
      this.searchFormData = this.searchForm;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryBannerByPage();
    },
    queryBannerByPage(params = {}) {
      this.loading = true;

      queryBannerByPage({
        pageNo: this.$refs.pagination.pageNo,
        pageSize: this.$refs.pagination.pageSize,
        ...this.searchFormData,
        ...params
      }).then(res => {

        this.$refs.pagination.update({
          pageNo: res.data.pageNo,
          currentPage: res.data.pageNo,
          pageSize: res.data.pageSize,
          total: res.data.total
        })

        this.tableData = res.data.list;

      }).finally(() => {
        this.loading = false;
      })
    },

    init() {
      this.queryBannerByPage();
    },



  },
  created() {

      setTimeout(() => {
          this.init();
      }, 500)
  }
};
</script>

<style lang="scss" scoped>
  .table-img {
    display: block;
    width: 75px;
    height: 45px;
    margin: 0 auto;
    border: 1px solid #ccc;
  }
</style>