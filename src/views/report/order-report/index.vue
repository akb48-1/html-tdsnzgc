<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm" ref="searchForm" >
      <el-form-item label="付款方式：">
        <el-select v-model="searchForm.payment_type" class="w140" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.payment_type_name" :value="item.payment_type_id" :key="`item.value-${index}`" v-for="(item, index) in payment_type_list" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select v-model="searchForm.payment_status" class="w140" clearable>
          <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in payment_status_list" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流方式：">
        <el-select v-model="searchForm.shipping_methods" class="w140" clearable>
          <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in shipping_methods_list" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售员：">
        <el-select v-model="searchForm.seller_id" class="w140" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.seller_name" :value="item.seller_id" :key="`item.value-${index}`" v-for="(item, index) in seller_list" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车型：">
        <el-select v-model="searchForm.car_type" class="w140" clearable>
          <el-option label="全部" value=""></el-option>
          <el-option :label="item.car_type_name" :value="item.car_type_id" :key="`item.value-${index}`" v-for="(item, index) in car_type_list" ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="司机：">
        <el-select v-model="searchForm.shipping_methods_list" class="w140">
          <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in payment_status_list" ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="订单交易日期：" prop="order_time_begin">
          <el-date-picker
          class="w140"
          v-model="searchForm.order_time_begin"
          type="date"
          value-format="yyyy-MM-dd"
          
          placeholder="选择开始日期">
        </el-date-picker> 至
        <el-date-picker
          class="w140"
          v-model="searchForm.order_time_end"
          type="date"
          value-format="yyyy-MM-dd"
          
          placeholder="选择截止日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="数据记录日期：">
          <el-date-picker
          class="w140"
          v-model="searchForm.create_time_begin"
          type="date"
          value-format="yyyy-MM-dd"
          
          placeholder="选择开始日期">
        </el-date-picker> 至
        <el-date-picker
          class="w140"
          v-model="searchForm.create_time_end"
          type="date"
          value-format="yyyy-MM-dd"
          
          placeholder="选择截止日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>


    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="order_price" label="订单总额" width="100"></el-table-column>
      <el-table-column prop="real_price" label="应付金额" width="180"></el-table-column>
      <el-table-column prop="payment_price" label="实付金额" width="180"></el-table-column>
      <el-table-column label="付款方式" >
        <template slot-scope="scope" >{{payment_type_list.find(item => item.payment_type_id == ''+scope.row.payment_type).payment_type_name }} </template>
      </el-table-column>

      <el-table-column label="订单状态">
        <template slot-scope="scope" >{{payment_status_list.find(item => item.value == ''+scope.row.payment_status).label }} </template>
      </el-table-column>
      <el-table-column prop="seller_name" label="销售员"></el-table-column>
      <el-table-column label="开单时间">
        <template slot-scope="scope" >{{ scope.row.order_time?  scope.row.order_time.split(' ')[0] : ''}} </template>
      </el-table-column>
      <el-table-column prop="createer_name" label="记录人"></el-table-column>
      <el-table-column prop="create_time" label="记录时间"></el-table-column>
      <el-table-column prop="chauffeur_name" label="司机名称"></el-table-column>
      <el-table-column label="物流方式">
        <template slot-scope="scope" >{{shipping_methods_list.find(item => item.value === ''+scope.row.shipping_methods).label }} </template>
      </el-table-column>
      <el-table-column label="车型">
        <template slot-scope="scope" >{{car_type_list.find(item => item.car_type_id == ''+scope.row.car_type).car_type_name }} </template>
      </el-table-column>
      <el-table-column prop="order_desc" label="描述"></el-table-column>
      <el-table-column label="操作" width="180">
        <!-- <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
          <el-button @click="editInfo(scope.row)" type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button @click="deleteInfo(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template> -->
      </el-table-column>
    </el-table>


    <div class="clearfix">
      <el-table
      :data="totalInfo" border style="width: 400px;display: inline-block;" v-loading="loading" class="mt10 fl"
      >
        <el-table-column label="符合条件数">
          <template slot-scope="scope">{{scope.row.total}}条</template>
        </el-table-column>
        <el-table-column label="订单总额合计">
          <template slot-scope="scope">{{scope.row.total_order_price}} 元</template>
        </el-table-column>
        <el-table-column label="应付金额合计">
          <template slot-scope="scope">{{scope.row.total_real_price}} 元</template>
        </el-table-column>
        <el-table-column label="实付金额">
          <template slot-scope="scope">{{scope.row.total_payment_price}} 元</template>
        </el-table-column>
      </el-table>

      <new-pagination
        :loading="loading"
        class="pdtm10 fr"
        style="text-align: right;display: inline-block;"
        ref="pagination"
        @current-change="handleCurrentChange"
      ></new-pagination>
    </div>
    
    

  </div>
</template>

<script>
import { queryOrderReport } from '@/http';
import { confirmTips, validate, loadData } from "@/decorator";


export default {
  name: 'order-report',

  @loadData([
    {
      key: "payment_type_list",
      url: "/paymentType/queryAll"
    },
    {
      key: "car_type_list",
      url: "/carType/queryAll"
    },
    {
      key: "seller_list",
      url: "/seller/queryAll"
    },
  ])
  data() {
    return {
      searchForm: {
        payment_type: "",
        payment_status: "",
        shipping_methods: "",
        seller_id: "",
        car_type: "",
        chauffeur_id: "",
        order_time_begin: "",
        order_time_end: "",
        create_time_begin: "",
        create_time_end: "",
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      payment_status_list: [
        {
          label: '全部',
          value: '',
        },{
          label: '已付清',
          value: '1',
        },{
          label: '部分支付',
          value: '2',
        },{
          label: '未支付',
          value: '3',
        }
      ],
      shipping_methods_list: [
        {
          label: '全部',
          value: '',
        },{
          label: '买家付运费',
          value: '1',
        },{
          label: '卖家付运费',
          value: '2',
        }
      ],
      totalInfo: [],
    }
  },
  methods: {
    formSearch(params = {}) {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
            if(this.searchForm.create_time_begin && this.searchForm.create_time_end) {
              let create_time_begin = new Date(this.searchForm.create_time_begin).getTime()
              let create_time_end = new Date(this.searchForm.create_time_end).getTime()
              if(create_time_begin > create_time_end) {
                this.$message.warning('数据记录截止日期不能小于数据记录开始日期')
                return;
              }
            }
            if(this.searchForm.order_time_begin && this.searchForm.order_time_end) {
              let order_time_begin = new Date(this.searchForm.order_time_begin).getTime()
              let order_time_end = new Date(this.searchForm.order_time_end).getTime()
              if(order_time_begin > order_time_end) {
                this.$message.warning('订单交易截止日期不能小于订单交易开始日期')
                return;
              }
            }

            this.searchFormData = this.searchForm;

            this.$refs.pagination.update({
              pageNo: 1
            })

            this.queryOrderReport();

          } else {
            return false;
          }
      })
      
    },
    queryOrderReport(params = {}) {
      this.loading = true;

      queryOrderReport({
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
        this.totalInfo = [res.data.totalInfo];
      }).finally(() => {
        this.loading = false;
      })
    },
    handleCurrentChange(pageNo) {
      this.queryOrderReport()
    },

    init() {
      this.queryOrderReport();
    },
  },
  created() {

      setTimeout(() => {
          this.init();
      }, 500)
  }
}
</script>

