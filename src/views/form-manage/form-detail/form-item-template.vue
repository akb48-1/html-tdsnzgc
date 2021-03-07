<template>
  <div>
    <el-form-item :label="cItem.label" v-if="cItem.ele == 'input'" :required="cItem.required">
      <el-input
        v-model="cItem.value"
        :type="cItem.type || 'text'"
        :placeholder="cItem.placeholder + cItem.label"
        :maxlength="cItem.maxlength"
        :disabled="cItem.disabled"
        :readonly="cItem.readonly"
        :show-word-limit="cItem.type == 'textarea'"
      ></el-input>
    </el-form-item>
    <el-form-item :label="cItem.label" v-if="cItem.ele == 'select'" :required="cItem.required">
      <el-select
        v-model="cItem.value"
        :placeholder="cItem.placeholder + cItem.label"
        :multiple="cItem.multiple"
      >
        <template v-for="(pItem, pIndex) in cItem.projectList">
            <el-option :label="pItem.label" :value="pItem.value" :key="pIndex"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item :label="cItem.label" v-if="cItem.ele == 'radio'" :required="cItem.required">
      <el-radio-group
        v-model="cItem.value"
        :placeholder="cItem.placeholder + cItem.label"
      >
        <el-radio label="yyyy-MM-dd">yyyy-MM-dd</el-radio>
        <el-radio label="timestamp">时间戳</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item :label="cItem.label" v-if="cItem.ele == 'checkbox'" :required="cItem.required">
      <el-checkbox-group
        v-model="arrValue"
        :placeholder="cItem.placeholder + cItem.label"
      >
      <template v-for="(pItem, pIndex) in cItem.projectList">
          <el-checkbox :label="pItem.value" :key="pIndex">{{pItem.label}}</el-checkbox>
      </template>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item :label="cItem.label" v-if="cItem.ele == 'date'" :required="cItem.required">
      <el-date-picker
        v-model="cItem.value"
        :type="cItem.type"
        :placeholder="cItem.placeholder + cItem.label"
        :format="cItem.format"
        :value-format="valueFormat"
      >
      </el-date-picker>
    </el-form-item>

    <template v-if="cItem.ele == 'dateGroup'">
      <div>
        <el-form-item :label="cItem.beginLabel" :required="cItem.required">
          <el-date-picker
            v-model="objValue.beginValue"
            :type="cItem.type"
            :placeholder="cItem.placeholder + cItem.beginLabel"
            :format="cItem.format"
            :value-format="valueFormat"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div>
        <el-form-item :label="cItem.endLabel" :required="cItem.required">
          <el-date-picker
            v-model="objValue.endValue"
            :type="cItem.type"
            :placeholder="cItem.placeholder + cItem.endLabel"
            :format="cItem.format"
            :value-format="valueFormat"
          >
          </el-date-picker>
        </el-form-item>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "form-item-template",
  components: {
  },
  props: {
    cItem: {
      type: Object,
      required: true,
    },
    propValue: {
      required: true,
    },
  },
  data() {
    return {
      arrValue: [],
      objValue: {},
      valueFormat: "yyyy-MM-dd",
    };
  },
  watch: {
    arrValue: {
      deep: true,
      handler(newVal) {
        this.$emit("update:propValue", newVal);
      },
    },
    objValue: {
      deep: true,
      handler(newVal) {
        this.$emit("update:propValue", newVal);
      },
    },
  },
};
</script>