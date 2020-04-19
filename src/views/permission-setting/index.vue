<template>
    <page id="permission-setting">
        <el-form :inline="true" :model="searchForm" >
            <el-form-item label="权限ID" >
                <el-input v-model.number="searchForm.permission_id" placeholder="权限ID" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="权限名称" >
                <el-input v-model="searchForm.permission_name" placeholder="权限名称" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="权限类型" >
                <el-select v-model.number="searchForm.permission_type" placeholder="权限类型" class="w80">
                    <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in permission_type_list" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </page>
</template>

<script>
export default {
    data() {
        return {
            permission_type_list: [
                {
                    label: '菜单',
                    value: 1
                },
                {
                    label: '按钮',
                    value: 2
                },
            ],
            searchForm: {
                permission_id: '',
                permission_name: '',
                permission_type: 1,
            }
        }
    },
    methods: {
        onSubmit() {
            console.log(this.searchForm)
        }
    }
}
</script>

<style>

</style>