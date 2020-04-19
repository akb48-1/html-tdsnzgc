<template>
    <div>
        <h3>{{handle == add? "新增按钮" : ""}}</h3>
        <h3>{{handle == update? "修改按钮" : ""}}</h3>
        <el-form :model="permissionData"  label-width="85px">
            <el-form-item label="按钮ID：">
                <el-input v-model.number="permissionData.id" placeholder="权限ID" class="w180" :disabled="handle === update"></el-input>
            </el-form-item>
            <el-form-item label="按钮名称：" >
                <el-input v-model="permissionData.name" placeholder="按钮名称" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="按钮值：" >
                <el-input v-model="permissionData.value" placeholder="按钮值" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="序号：" >
                <el-input v-model="permissionData.index" placeholder="序号" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="父菜单ID：" >
                <el-input v-model.number="permissionData.parent_id" placeholder="序号" class="w180" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onAdd" v-show="handle == add">新增</el-button>
                <el-button type="primary" @click="onUpdate" v-show="handle == update">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            permissionData: {}
        }
    },
    props: {
        info: {
            type: Object,
            required: false
        },
        handle: {
            type: String,
            required: true,
        },
        add: {
            type: String,
            required: true,
        },
        update: {
            type: String,
            required: true,
        },
    },
    watch: {
        info(newVal) {
            this.permissionData = {...newVal};
        }
    },
    methods: {
        onUpdate() {
            console.log('permissionData => ', this.permissionData)
            console.log('info => ', this.info)
        },
        onAdd() {
            console.log('permissionData => ', this.permissionData)
        }
    },
    created() {
        this.permissionData = {...this.info};
    }
}
</script>

<style>

</style>