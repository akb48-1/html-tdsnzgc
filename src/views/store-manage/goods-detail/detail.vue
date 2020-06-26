<template>
  <div>
    <el-row class="organ-info">
      <div class="left">
        <div class="organ-pic">
          <el-upload
            :disabled="handlerType === 'view'"
            class="avatar-uploader"
            action="/api/file/uploadImg"
            name="file"
            :headers="headers"
            :data="{type: 'goods'}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="goodsDateilForm.goods_picture"
              :src="baseURL + goodsDateilForm.goods_picture"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="right">
        <el-form
          :inline="false"
          :model="goodsDateilForm"
          ref="goodsDateilForm"
          label-width="85px"
          :rules="goodsDateilFormRules"
          :disabled="handlerType === 'view'"
        >
          <el-form-item label="商品ID：" v-if="false">
            <el-input
              v-model.number="goodsDateilForm.goods_id"
              placeholder="商品ID"
              class="w260"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称：" prop="goods_name">
            <el-input v-model="goodsDateilForm.goods_name" placeholder="商品名称" class="w260"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：" prop="goods_price">
            <el-input v-model.number="goodsDateilForm.goods_price" placeholder="商品价格" class="w260"></el-input>
          </el-form-item>

          <el-form-item label="商品类别：" prop="classify_ids">
            <el-checkbox-group v-model="goodsDateilForm.classify_ids" class="w260">
              <el-checkbox
                :label="'' + item.classify_id"
                :key="index"
                v-for="(item, index) in classifyList"
              >{{item.classify_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="单位：" prop="unit_id">
            <el-select v-model.number="goodsDateilForm.unit_id" placeholder="单位" class="w260">
              <el-option
                :label="item.unit_name"
                :value="item.unit_id"
                :key="index"
                v-for="(item, index) in unitList"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品图片：" prop="goods_picture">
            <el-input v-model="goodsDateilForm.goods_picture" placeholder="商品图片" class="w260"></el-input>
          </el-form-item>

          <el-form-item label="描述：" prop="goods_desc">
            <el-input
              type="textarea"
              rows="5"
              resize="none"
              v-model="goodsDateilForm.goods_desc"
              placeholder="描述"
              class="w260"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status" v-if="handlerType != 'add'">
            <el-select v-model.number="goodsDateilForm.status" placeholder="权限类型" class="w260">
              <el-option
                :label="item.label"
                :value="item.key"
                :key="index"
                v-for="(item, index) in statusList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="handler-box ml20">
          
          <el-button type="primary" @click="onSubmit" v-if="handlerType == 'add'">新增商品</el-button>
          <el-button type="primary" @click="onSubmit" v-if="handlerType == 'edit'">提交修改</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { queryGoods, updateGoods, addGoods, fileUpload } from "@/http";
import { baseURL } from "@/http/axios";
import { loadData } from "@/decorator";
import {  removeCachePage } from "@/libs/cachePage";
import { confirmTips, validate } from "@/decorator";

export default {

  props: ['goodsid'],  
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
      headers: {
        token: localStorage.getItem('token')
      },
      baseURL: baseURL,
      routeData: {},
      id: "",
      imageUrl: "",
      goodsDateilForm: {
        goods_id: "",
        goods_name: "",
        goods_price: "",
        goods_desc: "",
        goods_picture: "",
        status: 0,
        classify_ids: []
      },
      goodsDateilFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],

        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        unit_id: [{ required: true, message: "请选择单位" }],
        classify_ids: [{ required: true, message: "请选择类别" }],
        goods_picture: [
          { required: true, message: "请输入商品缩略图", trigger: "blur" }
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      statusList: [
        {
          key: 0,
          label: "在售"
        },
        {
          key: 1,
          label: "停售"
        },
        {
          key: 2,
          label: "售馨"
        }
      ]
    };
  },
  computed: {
    handlerType() {
      var type = {
        add : 'add',
        edit : 'edit'
      }

      return type[this.$route.params.type] || 'view'
    }
  },
  methods: {

    queryGoods(id) {
      queryGoods(id).then(res => {
        if (res.success) {
          if(res.data.classify_ids) {
            res.data.classify_ids = res.data.classify_ids.split(',')
          }
          this.goodsDateilForm = { ...res.data };
        }
      });
    },
    addGoods(params = {}) {
      addGoods(params).then(res => {
        this.$message.success(res.message)
        setTimeout(() => {
          removeCachePage([this.routeData.path])
          this.$router.push({
            path: '/goods-list'
          })
        }, 500);
      });
    },
    updateGoods(params = {}) {
      updateGoods(params).then(res => {
        this.$message.success(res.message)
        setTimeout(() => {
          removeCachePage([this.routeData.path])
          this.$router.push({
            path: '/goods-list'
          })
        }, 500);
      });
    },
    handleAvatarSuccess(res, file) {
      if(!res.success) {
        this.$message.error(res.message)
      } else {
        this.goodsDateilForm.goods_picture = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return isJPG && isLt2M;
    },

    @validate('goodsDateilForm')
    onSubmit(...args) {
      if(this.handlerType == 'add') {
        this.addGoods({ ...this.goodsDateilForm, classify_ids: this.goodsDateilForm.classify_ids.join(',')},...args);
      } else if (this.handlerType == 'edit') {
        this.updateGoods({ ...this.goodsDateilForm, classify_ids: this.goodsDateilForm.classify_ids.join(',')},...args);
      }
    },
    init() {
      if(this.routeData.query.id != undefined) {
        this.queryGoods(this.routeData.query.id)
      }
    }
  },


  mounted() {
    this.routeData = {
        fullPath: this.$route.fullPath,
        path: this.$route.path,
        params: this.$route.params,
        query: this.$route.query,
        name: this.$route.name,
    }
    this.init()
  },
  created() {
    setTimeout(() => {
        console.log("----------------------------------------------------");
    }, 10);
  }
};
</script>

<style scped lang="scss">
.organ-info {
  width: 800px;
  margin: 50px auto 10px auto;
  display: flex;
  .left {
    width: 200px;
  }
  .right {
    flex: 1;
    margin-left: 15px;
  }
  .organ-pic {
    height: 240px;
    margin: 0 auto;
    border: 1px solid #ccc;
    position: relative;
  }
  .avatar-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
  .avatar-uploader .el-upload {
    width: 100%;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    // width: 178px;
    // height: 178px;
    width: 100%;
    display: block;
  }
}
</style>