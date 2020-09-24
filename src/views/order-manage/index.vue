<template>
  <div class="order-manage">
    <div>订单管理</div>
    <el-input v-model="search" @input="inputHandle"></el-input>

    <el-upload
      ref="upload"
      action="#"
      list-type="picture-card"
      :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <!-- <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="formatUrl(file.url, file)" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div> -->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
  
</template>

<script>
import { debounce, throttle } from '@/decorator'

export default {
  name: 'order-manage',
  components: {
  },
  data() {
    return {
      search: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    }
  },
  methods: {
    @throttle(1000)
    inputHandle(value) {
      console.log(value)
    },
    handleRemove(file) {
      console.log(file);
      console.log(this.$refs.upload)
      this.$refs.upload.uploadFiles = this.$refs.upload.uploadFiles.filter(item => item.url != file.url )
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    formatUrl(url, file) {
      // console.log(url, file)
      let type = file.raw.type;
      // console.log(type, 'type')
      if(type == 'application/pdf') {
        return '//www.baidu.com/img/flexible/logo/pc/result.png'
      }
      return url
    }
  }
}
</script>
