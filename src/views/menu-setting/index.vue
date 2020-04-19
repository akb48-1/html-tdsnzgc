<template>
    <page id="menu-setting">
        <div class="handle-wrapper">
            <el-button type="primary" @click="add1LevelMenu" >新增一级菜单</el-button>
            <el-button type="primary" @click="add2LevelMenu" :disabled="!addTwoMenu">新增二级菜单</el-button>
            <el-button type="primary" @click="addButtonMenu" :disabled="!addButton">新增按钮菜单</el-button>
        </div>
        <auto-flex class="mt20">
            <permission-tree
             :data="menuList" 
             @on-click="handleNodeClick" 
             :currentRow="currentRow" 
             slot="left"
             class="w200 pd10 mr15 permission-tree"
            />
            <permission-menu
             slot="right" 
             :info="info" 
             v-if="info.type == 1 " 
             :handle="handle" 
             :add="ADD" 
             :update="UPDATE"
            ></permission-menu>
            <permission-button
             slot="right" 
             :info="info" 
             v-if="info.type == 2" 
             :handle="handle" 
             :add="ADD" 
             :update="UPDATE"
            ></permission-button>
        </auto-flex>
    </page>
</template>

<script>
import { queryAllPermissionMenu } from '@/http'

const urlMenu = {
    title: '',
    route_url: '',
    index: '',
    level: '',
    type: 1, // 1菜单 2 按钮
    component_path: '',
    parent_id: '',
    icon: ''
}

const buttonMenu = {
    name: '',
    value: '',
    index: '',
    type: 2, // 1菜单 2 按钮
    parent_id: ''
}

export default {
    components: {
        'permission-tree': () => import('@/components/permission-tree.vue'),
        'permission-menu': () => import('./permission-menu.vue'),
        'permission-button': () => import('./permission-button.vue'),
    },
    data() {
        return {
            menuList: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            info: {},
            addTwoMenu: false,
            addButton: false,
            handle: '',
            ADD: 'ADD',
            UPDATE: 'UPDATE',
            currentRow: {}
        }
    },
    methods: {
        handleNodeClick(row, node) {
            this.currentRow = {...row}
            this.info = {...row};
            this.handle = this.UPDATE;
            this.$set(row, 'showChild', !row.showChild);


            if(row.type == 1) {

                var isMenuList = false;
                var isHandleList = false;
                
                if(row.children) {
                    isMenuList = row.children.some(menu => menu.type == 1)
                    isHandleList = row.children.some(menu => menu.type == 2)
                }


                if(!isMenuList && !isHandleList && node.level == 1) {
                    this.addTwoMenu = true;
                    this.addButton = true;
                }
                if(isMenuList && !isHandleList && node.level == 1) {
                    this.addTwoMenu = true;
                    this.addButton = false;
                }
                if(!isMenuList && isHandleList && node.level == 2) {
                    this.addTwoMenu = false;
                    this.addButton = true;
                }
                if(!isMenuList && !isHandleList && node.level == 2) {
                    this.addTwoMenu = false;
                    this.addButton = true;
                }

            } else if (row.type == 2) {
                this.addTwoMenu = false;
                this.addButton = false;
            }

        },
        queryAllPermissionMenu() {
            queryAllPermissionMenu().then(res => {
                this.menuList = this.filterMenuList(res.data)
            })
        },
        filterMenuList(menuList) {
            if(Array.isArray(menuList)) {
                return menuList.map(menu => {
                    menu.label = menu.title || menu.name;
                    if(menu.children == null && Array.isArray(menu.handle_list)) {
                        menu.children = this.filterMenuList(menu.handle_list);
                    } else {
                        menu.children = this.filterMenuList(menu.children);
                    }
                    return menu;
                })
            }
        },
        add1LevelMenu() {
            this.handle = this.ADD;
            this.info = {...urlMenu, level: 1, parent_id: ''};
            this.currentRow = {};
        },
        add2LevelMenu() {
            this.handle = this.ADD;
            this.info = {...urlMenu, level: 2, parent_id: this.currentRow.id};
        },
        addButtonMenu() {
            this.handle = this.ADD;
            this.info = {...buttonMenu, parent_id: this.currentRow.id};
        }
    },
    created() {
        this.queryAllPermissionMenu()
    }
}
</script>

<style lang="scss" scoped>
    .permission-tree {
        border: 3px double #ddd;
        height: 600px;
        overflow-y: auto;
    }
</style>