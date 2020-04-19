<template>
    <div>
        <h3>{{title}}</h3>
        
        <el-form :model="permissionData" label-width="85px">
            <el-form-item label="菜单ID：" >
                <el-input v-model.number="permissionData.id" placeholder="菜单ID" class="w180" :disabled="handle === update"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称：" >
                <el-input v-model="permissionData.title" placeholder="菜单名称" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="路由地址：" v-if="permissionData.route_url || handle == add">
                <el-input v-model="permissionData.route_url" placeholder="路由地址" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="组件路径：" v-if="permissionData.component_path || handle == add">
                <el-input v-model="permissionData.component_path" placeholder="组件路径" class="w180"></el-input>
            </el-form-item>
            <el-form-item label="图标：" >
                <el-input v-model="permissionData.icon" placeholder="图标" class="w180" :prefix-icon="permissionData.icon"></el-input>
            </el-form-item>
            <el-form-item label="序号：" >
                <el-input v-model.number="permissionData.index" placeholder="序号" class="w180"></el-input>
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
            permissionData: null
        }
    },
    props: {
        info: {
            type: Object,
            required: false
        },
        handle: {
            type: String,
            required: false,
            default: 'update'
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
            console.log(this.permissionData)
        }
    },
    computed: {
        title() {
            var handleObj = {
                ADD: '新增',
                UPDATE: '修改'
            }

            console.log(this.handle)
            return handleObj[this.handle] + '菜单';
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