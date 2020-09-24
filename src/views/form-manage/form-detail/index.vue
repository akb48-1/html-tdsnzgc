<template>
  <div id="form-detail">
    <div class="content">
      <div class="left">
        <div v-for="(item, index) in elementList" :key="index">
          <div draggable="true" @dragstart="dragstart($event, item)">
            <img :src="item.pic" />
          </div>
        </div>
      </div>
      <div class="center">
        <ele-multiple
          :resultList.sync="resultList"
          :isMultiple="false"
          @edit="edit"
        ></ele-multiple>
      </div>
      <div class="right">
        <div v-if="currentItem">
            <el-form  class="demo-form-inline" label-suffix="：">
                <el-form-item label="字段中文名">
                    <el-input v-model="currentItem.label"></el-input>
                </el-form-item>
                <el-form-item label="字段英文名">
                    <el-input v-model="currentItem.keyName"></el-input>
                </el-form-item>
                <el-form-item label="默认填充" v-if="['input', 'select'].includes('currentItem.ele')">
                    <el-input v-model="currentItem.placeholder"></el-input>
                </el-form-item>
                <el-form-item label="最长字符" v-if="currentItem.ele == 'input' && currentItem.type != 'number'">
                    <el-input v-model="currentItem.maxlength"></el-input>
                </el-form-item>
                <el-form-item label="是否必填">
                    <el-radio-group v-model="currentItem.required">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否显示">
                    <el-radio-group v-model="currentItem.show">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否禁用">
                    <el-radio-group v-model="currentItem.disabled">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否只读">
                    <el-radio-group v-model="currentItem.readonly">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="类型" v-if="currentItem.ele == 'input'">
                    <el-radio-group v-model="currentItem.type">
                        <el-radio label="text">文本框</el-radio>
                        <el-radio label="number">数字</el-radio>
                        <el-radio label="textarea">文本域</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="最长整数" v-if="currentItem.ele == 'input' && currentItem.type == 'number'">
                    <el-input v-model="currentItem.intLength"></el-input>
                </el-form-item>
                <el-form-item label="是否可多选" v-if="currentItem.ele == 'select'">
                    <el-radio-group v-model="currentItem.multiple">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item v-if="['select', 'checkbox'].includes(currentItem.ele)">
                    <div>项目编辑</div>
                    <div style="border: 1px solid #333;">
                        <template v-if="currentItem.projectList.length == 0">
                            <el-tag type="" @click="addProject(currentItem.projectList)" >添加</el-tag>
                        </template>
                        <template v-for="(pItem, pIndex) in currentItem.projectList" v-else>
                            <div :key="pIndex">
                                <el-form-item label="名称" >
                                    <el-input v-model="pItem.label"></el-input>
                                </el-form-item>
                                <el-form-item label="值" >
                                    <el-input v-model="pItem.value"></el-input>
                                </el-form-item>
                                <el-tag type="" @click="addProject(currentItem.projectList)" v-if="pIndex == currentItem.projectList.length -1">添加</el-tag>
                                <el-tag type="danger" @click="removeProject(currentItem.projectList, pIndex)">删除</el-tag>
                            </div>
                        </template>
                    </div>
                    
                </el-form-item>
                
                <el-form-item label="显示在输入框中的格式" v-if="['dateGroup', 'date'].includes(currentItem.ele)">
                    <el-select v-model="currentItem.format" placeholder="请选择">
                        <el-option value="yyyy" label="yyyy"></el-option>
                        <el-option value="yyyy-MM" label="yyyy-MM"></el-option>
                        <el-option value="yyyy-MM-dd" label="yyyy-MM-dd"></el-option>
                        <el-option value="yyyy-MM-dd hh" label="yyyy-MM-dd hh"></el-option>
                        <el-option value="yyyy-MM-dd hh:mm" label="yyyy-MM-dd hh:mm"></el-option>
                        <el-option value="yyyy-MM-dd hh:mm:ss" label="yyyy-MM-dd hh:mm:ss"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间组件类型" v-if="['dateGroup', 'date'].includes(currentItem.ele)">
                    <el-select v-model="currentItem.type" placeholder="请选择">
                        <el-option label="日期" value="date"></el-option>
                        <el-option label="日期时间" value="datetime"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
        </div>
      </div>
    </div>

    <div class="form" style="border: 1px solid #333;padding:15px;margin-top: 20px; ">
        <h4>表单生成</h4>
        <el-form :inline="true"  class="form-inline" label-suffix="：">
            <cus-form :list="resultList"/>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "form-detail",
  components: {
    "ele-multiple": () => import("./multiple.vue"),
    "cus-form": () => import("./form.vue"),
  },
  data() {
    return {
      elementList: [
        {
          id: 1,
          ele: "input",
          type: "text",
          required: true,
          keyName: "input",
          label: "输入框",
          show: true,
          pic: require("./img/input.png"),
          placeholder: "请输入",
          maxlength: 20,
          disabled: false,
          readonly: false,
        },
        {
          id: 2,
          ele: "select",
          required: true,
          keyName: "select",
          label: "下拉框",
          show: true,
          pic: require("./img/select.png"),
          placeholder: "请选择",
          maxlength: 20,
          disabled: false,
          readonly: false,
          multiple: false,
          projectList: [
              {
                  label: '项目1',
                  value: '1'
              },
              {
                  label: '项目2',
                  value: '2'
              },
          ]
        },
        {
          id: 3,
          ele: "radio",
          required: true,
          keyName: "radio",
          label: "单选框",
          show: true,
          pic: require("./img/radio.png"),
          placeholder: "请选择",
          maxlength: 20,
          disabled: false,
          readonly: false,
        },
        {
          id: 4,
          ele: "checkbox",
          required: true,
          keyName: "checkbox",
          label: "复选框",
          show: true,
          pic: require("./img/checkbox.png"),
          placeholder: "请选择",
          maxlength: 20,
          disabled: false,
          readonly: false,
          projectList: [
              {
                  label: '项目3',
                  value: '3'
              },
              {
                  label: '项目4',
                  value: '4'
              },
          ]
        },
        {
          id: 5,
          ele: "date",
          required: true,
          keyName: "date",
          label: "日期时间",
          show: true,
          pic: require("./img/date.png"),
          placeholder: "请选择",
          maxlength: 20,
          disabled: false,
          readonly: false,
          type: "date",
          format: "yyyy-MM-dd ",
          valueFormat: "yyyy-MM-dd",
        },
        {
          id: 5,
          ele: "dateGroup",
          required: true,
          keyName: "dateGroup",
          label: "时间组合",
          beginLabel: "开始时间",
          endLabel: "结束时间",
          show: true,
          pic: require("./img/dateGroup.png"),
          placeholder: "请选择",
          disabled: false,
          readonly: false,
          type: "date",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
        },
        {
          id: 5,
          ele: "group",
          required: true,
          keyName: "group",
          label: "组合",
          show: true,
          pic: require("./img/group.png"),
          multiple: [],
        },
      ],
      resultList: [],
      currentItem: null,
    };
  },
  methods: {
    dragstart(e, item) {
      e.dataTransfer.setData("Text", JSON.stringify(item));
    },
    edit(item) {
        // this.currentItem = JSON.parse(JSON.stringify(item))
        this.currentItem = item
    },
    addProject(list) {
        list.push({
            label: '',
            value: ''
        })
    },
    removeProject(list, index) {
        this.currentItem.projectList = this.currentItem.projectList.filter((item, idx) => idx != index)
    }
  },
  created() {},
};
</script>

<style lang="scss" >
.content {
  overflow: hidden;
  .left,
  & .center,
  & .right {
    float: left;
    border: 1px solid #ccc;
    
    box-sizing: border-box;
    padding: 15px;
  }
  .left {
      width: 30%;
    
  }
  .center {
      width: 36%;
    height: 500px;
    margin-left: 2%;
    margin-right: 2%;
    .result-item {
      margin-bottom: 15px;
      .result-pic {
        position: relative;
      }
      .el-icon-close {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
    }
    .await-result {
      height: 15px;
      background-color: #ccc;
    }
  }
  .right {
width: 30%;
  }
}

.handle-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .result-list-wrapper {
    overflow: auto;
  }
  .line-wrapper {
    flex: 1;
    min-height: 40px;
  }
}

.group-wrapper {
  padding: 10px;
  max-width: 200px;
  min-height: 200px;
  border: 1px solid #ccc;
}
</style>