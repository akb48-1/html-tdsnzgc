<template>
  <div>
    <el-row class="banner-info">
      <div class="left">
        <div class="banner-pic">
          <el-upload
            :disabled="handlerType === 'view'"
            class="avatar-uploader"
            action="/api/file/uploadImg"
            name="file"
            :headers="headers"
            :data="{type: 'banner'}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="dateilForm.banner_url"
              :src="baseURL + dateilForm.banner_url"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="right">
        <el-form
          :inline="false"
          :model="dateilForm"
          ref="dateilForm"
          label-width="85px"
          :rules="dateilFormRules"
          :disabled="handlerType === 'view'"
        >
          <el-form-item label="轮播图ID：" v-if="false">
            <el-input
              v-model.number="dateilForm.banner_id"
              placeholder="轮播图ID"
              class="w260"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别：" prop="type">
            <el-select v-model.number="dateilForm.type" placeholder="类别" class="w260">
              <el-option
                :label="item.label"
                :value="item.key"
                :key="index"
                v-for="(item, index) in typeList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片地址：" prop="banner_url">
            <el-input v-model="dateilForm.banner_url" placeholder="轮播图地址" class="w260"></el-input>
          </el-form-item>
          <el-form-item label="链接地址：" prop="href">
            <el-input
              v-model.number="dateilForm.href"
              placeholder="链接地址"
              class="w260"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序：" >
            <el-input
              v-model.number="dateilForm.sort"
              placeholder="排序"
              class="w260"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述：" prop="banner_desc">
            <el-input
              type="textarea"
              rows="5"
              resize="none"
              v-model="dateilForm.banner_desc"
              placeholder="描述"
              class="w260"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status" >
            <el-select v-model.number="dateilForm.status" placeholder="状态" class="w260">
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
          <el-button type="primary" @click="onSubmit" v-if="handlerType == 'add'">新增轮播图</el-button>
          <el-button type="primary" @click="onSubmit" v-if="handlerType == 'edit'">提交修改</el-button>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { queryBanner, updateBanner, addBanner, fileUpload } from "@/http";
import { baseURL } from "@/http/axios";
import { loadData } from "@/decorator";
import {  removeCachePage } from "@/libs/cachePage";
import { confirmTips, validate } from "@/decorator";

export default {

  props: ['bannerid'],  
  data() {

    return {
      imgWidth: 750,
      imgHeight: 300,
      headers: {
        token: localStorage.getItem('token')
      },
      baseURL: baseURL,
      routeData: {},
      id: "",
      imageUrl: "",
      dateilForm: {
        banner_id: "",
        banner_url: "",
        type: "",
        banner_desc: "",
        href: "",
        status: 0,
        sort: ''
      },
      dateilFormRules: {
        banner_url: [
          { required: true, message: "请上传轮播图", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择类型" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sort: [{required: false, message: "请输入排序", trigger: "input"}]
      },
      statusList: [
        {
          label: '启用',
          key: 0
        }, {
          label: '停用',
          key: 1
        }
      ],
      typeList: [
        {
          label: '首页',
          key: 0
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

    queryBanner(id) {
      queryBanner(id).then(res => {
        if (res.success) {
          if(res.data.classify_ids) {
            res.data.classify_ids = res.data.classify_ids.split(',')
          }
          this.dateilForm = { ...res.data };
        }
      });
    },
    addBanner(params = {}) {
      addBanner(params).then(res => {
        this.$message.success(res.message)
        setTimeout(() => {
          removeCachePage([this.routeData.path])
          this.$router.push({
            path: '/banner-manage'
          })
        }, 500);
      });
    },
    updateBanner(params = {}) {
      updateBanner(params).then(res => {
        this.$message.success(res.message)
        setTimeout(() => {
          removeCachePage([this.routeData.path])
          this.$router.push({
            path: '/banner-manage'
          })
        }, 500);
      });
    },
    handleAvatarSuccess(res, file) {
      if(!res.success) {
        this.$message.error(res.message)
      } else {
        this.dateilForm.banner_url = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传轮播图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传轮播图片大小不能超过 2MB!");
        return false;
      }
      
      const isSize = new Promise((resolve, reject) => {
          
          let _URL = window.URL || window.webkitURL;
          let img = new Image();
          img.onload = function () {
            let valid = img.width === this.imgWidth && img.height === this.imgHeight;
            valid ? resolve() : reject();
          }
          img.src = _URL.createObjectURL(file);
        }).then(() => {
          return file;
        }, () => {
          this.$message.error(`图片尺寸限制为${width}（宽） x ${height}（高）`)
          return Promise.reject();
        });

      return isJPG && isLt2M && isSize;
    },

    @validate('dateilForm')
    onSubmit(...args) {
      if(this.handlerType == 'add') {
        this.addBanner({ ...this.dateilForm},...args);
      } else if (this.handlerType == 'edit') {
        this.updateBanner({ ...this.dateilForm},...args);
      }
    },
    init() {
      if(this.routeData.query.id != undefined) {
        this.queryBanner(this.routeData.query.id)
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
  }
};
</script>

<style scped lang="scss">
.banner-info {
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
  .banner-pic {
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