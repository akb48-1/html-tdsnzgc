<template>
  <el-dialog :title="title" :visible.sync="show" :width="width" >
    <slot></slot>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button type="primary" @click="confirmHandel" :disabled="disabled" :icon="loadingIcon" v-if="handlerType === 'add'">确 定</el-button>
      <el-button type="primary" @click="modifyHandel" :disabled="disabled" :icon="loadingIcon" v-if="handlerType === 'edit'">修 改</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            disabled: false,
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
            required: true
        },
        width: {
            type: String,
            required: false,
            default: "30%"
        },
        confirm: {
            type: Function,
            default: () => Promise.resolve()
        },
        modify: {
            type: Function,
            default: () => Promise.resolve()
        },
        handlerType: {
            type: String,
            default: ''
        }
    },
    watch: {
        value(newVal) {
            this.show = newVal;
        },
        show(newVal) {
            this.$emit('input', newVal);
        }
    },
    computed: {
        loadingIcon() {
            return this.disabled? 'el-icon-loading' : '';
        }
    },
    methods: {
        confirmHandel() {
            this.disabled = true;
            setTimeout(() => {
                this.confirm().then((res) => {
                    this.show = false;
                }).catch(() => {
                    console.log('catch')
                }).finally(() => {
                    this.disabled = false;
                })
            }, 500);
        },
        modifyHandel() {
            this.disabled = true;
            setTimeout(() => {
                this.modify().then((res) => {
                    this.show = false;
                }).catch(() => {
                    console.log('catch')
                }).finally(() => {
                    this.disabled = false;
                })
            }, 500);
        }
    },
    created() {
        this.show = this.value;
    }
};
</script>

<style>
</style>