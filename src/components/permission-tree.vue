<template>
  <div>
      <div v-for="(item, index) in data" :key="index">
            <div v-if="item.title" @click.stop="onClick(item)" class="note" :class="currentRow.id == item.id? 'currentNote' : ''">
                <span v-html="placeholder + selfPlaceholder"></span>
                <i class="mr5" :class="item.showChild? 'el-icon-arrow-down' : 'el-icon-arrow-up'" v-if="Array.isArray(item.children)"></i>
                <span>{{item.title}}</span>
            </div>
            <div v-if="item.name" @click.stop="onClick(item)" class="note" :class="currentRow.id == item.id? 'currentNote' : ''">
                <span v-html="placeholder + selfPlaceholder"></span>
                <i class="mr5 el-icon-wind-power"></i>
                <span >{{item.name}}</span>
            </div>
            <permission-tree
             v-if="Array.isArray(item.children) && item.showChild" 
             :data="item.children" 
             :placeholder="placeholder + selfPlaceholder" 
             :level="level + 1"
             @on-click="onClick"
             :currentRow="currentRow"
            />
      </div>
  </div>
</template>

<script>
export default {
    components: {
        'permission-tree': () => import('@/components/permission-tree.vue'),
    },
    data() {
        return {
            selfPlaceholder: "&nbsp;&nbsp;&nbsp;&nbsp;",
            selfShowChild: false
        }
    },
    props: {
        data: {
            type: Array,
            default: Array,
        },
        placeholder: {
            type: String,
            default: '',
        },
        showChild: {
            type: Boolean,
            default: false,
        },
        level: {
            type: Number,
            default: 1,
        },
        currentRow: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClick(item,  payload ) {
            let level = payload? payload.level : this.level;
            this.$emit('on-click', item, {level: level});
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
    .note {
        line-height: 28px;
        cursor: pointer;
        margin-bottom: 3px;
        &:hover {
            background: #e9e9e9;
        }
    }
    .currentNote {
        background: #e8e8e8;
    }
</style>