<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="商品ID：">
        <el-input v-model="searchForm.goods_id" placeholder="商品ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="商品名称：">
        <el-input v-model="searchForm.goods_name" placeholder="商品名称" class="w140"></el-input>
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
      <el-button type="primary" @click="addItem">新增商品</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="goods_id" label="商品ID" width="180"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column label="分类" width="180" :formatter="formatterClassify">
      </el-table-column>
      <el-table-column label="单位" width="180">
          <template slot-scope="scope" >{{unitList.find(item => item.unit_id === scope.row.unit_id).unit_name }}</template>
      </el-table-column>

      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="createer_name" label="创建人"></el-table-column>
      <el-table-column prop="update_time" label="修改时间"></el-table-column>
      <el-table-column prop="updateer_name" label="修改人"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >{{statusList.find(item => item.value == scope.row.status).label }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
          <el-button @click="editInfo(scope.row)" type="warning" size="mini" icon="el-icon-edit"></el-button>
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
import { queryGoodsByPage } from '@/http'
import { loadData } from "@/decorator";

export default {
  
  @loadData([
    {
      key: "classifyList",
      url: "/classify/queryAll"
    },
    {
      key: "unitList",
      url: "/unit/queryAll"
    }
  ])
  data() {
    return {
      searchForm: {
        goods_id: "",
        goods_name: "",
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
          label: '在售',
          value: '0'
        }, {
          label: '停售',
          value: '1'
        }, {
          label: '售馨',
          value: '2'
        }
      ]
    };
  },
  methods: {
    formatterClassify(row, column, cellValue, index) {
      let classify_ids = row.classify_ids.split(',');
      let classify_str = [];
      this.classifyList.forEach(item => {
        classify_ids.forEach(class_id => {
          if(item.classify_id == class_id) classify_str.push(item.classify_name)
        })
      })
      return classify_str.join('、');
    },
    addItem() {
      this.$router.push({
        name: 'goods-detail',
        params: {
          type: 'add'
        }
      })
    },
    viewDetail(item) {
        console.log(item)
        this.$router.push({
          name: 'goods-detail',
          params: {
            type: 'view'
          },
          query: {
            id: item.goods_id
          }
        })
    },
    editInfo(item) {
      this.$router.push({
        name: 'goods-detail',
        params: {
          type: 'edit'
        },
        query: {
          id: item.goods_id
        }
      })

    },


    handleCurrentChange(pageNo) {
      this.queryGoodsByPage()
    },
    formSearch(params = {}) {
      this.searchFormData = this.searchForm;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryGoodsByPage();
    },
    queryGoodsByPage(params = {}) {
      this.loading = true;

      queryGoodsByPage({
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
      this.queryGoodsByPage();
    },



  },
  created() {

      setTimeout(() => {
          this.init();
      }, 100)
  }
};
</script>

<style>
</style>