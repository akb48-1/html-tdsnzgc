<template>
  <div>
      <el-row class="organ-info">
        <div class="left">
          <div class="organ-pic">
            <el-upload
              :disabled="!(handlerType === EDIT)"
              class="avatar-uploader"
              action="/api/file/uploadImg"
              name="file"
              :headers="headers"
              :data="{type: 'organ'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="organForm.organ_picture" :src="baseURL + organForm.organ_picture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="right">
          <el-form :inline="false" :model="organForm" ref="organForm" label-width="85px" :rules="organFormRules" :disabled="!(handlerType === EDIT)">
            <el-form-item label="分店ID：" v-if="false">
              <el-input v-model.number="organForm.organ_id" placeholder="分店ID" class="w260" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="分店名称：" prop="organ_name">
              <el-input v-model="organForm.organ_name" placeholder="分店名称" class="w260"></el-input>
            </el-form-item>
            <el-form-item label="分店地址：" prop="organ_address">
              <el-input v-model="organForm.organ_address" placeholder="分店地址" class="w260"></el-input>
            </el-form-item>
            <el-form-item label="成立时间：" prop="organ_create_time">
              <el-date-picker
                class="w260"
                v-model="organForm.organ_create_time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="分店图片：" prop="organ_picture" >
              <el-input v-model="organForm.organ_picture" placeholder="分店图片" class="w260"></el-input>
            </el-form-item>
            <el-form-item label="分店电话：" prop="organ_tel">
              <el-input v-model="organForm.organ_tel" placeholder="分店电话" class="w260"></el-input>
            </el-form-item>
            <el-form-item label="描述：" prop="organ_desc">
              <el-input type="textarea" rows="5" resize="none" v-model="organForm.organ_desc" placeholder="描述" class="w260"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status" v-if="false">
              <el-select v-model.number="organForm.status" placeholder="权限类型" class="w260">
                  <!-- <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in statusList" ></el-option> -->
              </el-select>
            </el-form-item>
            
          </el-form>
          <div class="handler-box ml20" >
            <el-button type="primary" @click="handlerType = EDIT" v-if="!(handlerType === EDIT)" :disabled="false">编 辑</el-button>
            <el-button type="primary" @click="onSubmit" v-if="handlerType === EDIT" :disabled="false">保 存</el-button>
            <el-button type="primary" @click="cancelEdit" v-if="handlerType === EDIT" :disabled="false">取 消 编 辑</el-button>
          </div>
        </div>
      </el-row>
  </div>
</template>

<script>
const EDIT = 'edit';
import { queryMyOrgan, updateOrgan } from '@/http';
import { baseURL } from '@/http/axios';
import { confirmTips, validate } from "@/decorator";


export default {
  data() {
    return {
      headers: {
        token: localStorage.getItem('token')
      },
      baseURL: baseURL,
      handlerType: '',
      EDIT: EDIT,
      imageUrl: '',
      organForm: {
        organ_id: '',
        organ_name: '',
        organ_address: '',
        organ_create_time: '',
        organ_desc: '',
        organ_picture: '',
        organ_tel: '',
        status: '',
      },
      organInfo: {
      },
      organFormRules: {
        organ_name: [{ required: true, message: "请输入分店名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    }
  },
  methods: {
    cancelEdit() {
      this.handlerType = '';
      this.organForm = {...this.organInfo};
    },
    queryMyOrgan() {
      queryMyOrgan().then(res => {
        if(res.success) {
          this.organInfo = {...res.data};
          this.organForm = {...res.data};
        }
      })
    },
    updateOrgan(params = {}) {
      updateOrgan(params).then(res => {
        this.$message.success(res.message)
        this.handlerType = '';
        this.queryMyOrgan()
      })
    },
    handleAvatarSuccess(res, file) {
      if(!res.success) {
        this.$message.error(res.message)
      } else {
        this.organForm.organ_picture = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      console.log( file)
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return isJPG && isLt2M;
    },
    @validate('organForm')
    onSubmit(...args) {
      this.updateOrgan({...this.organForm}, ...args);
    }
  },
  created() {
    this.queryMyOrgan()
  }
}
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
      margin-left: 15px;;
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
  .avatar {
    // width: 178px;
    // height: 178px;
    width: 100%;
    display: block;
  }
}

</style>