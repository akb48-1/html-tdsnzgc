<template>
    <div>
        <template v-for="(cItem, cIndex) in list">
            <template v-if="Array.isArray(cItem.multiple)">
                <template v-for="(ccItem, ccIndex) in cItem.multiple">
                    <div style="border: 1px solid #333;" :key="cIndex  + '-'+ ccIndex" >
                        <form-item-template :cItem="ccItem" :propValue.sync="ccItem.value" v-if="cItem.show"/>
                    </div>
                </template>
            </template>
            <template v-else>
                <form-item-template :cItem="cItem" :key="cIndex" :propValue.sync="cItem.value" v-if="cItem.show"/>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'cus-form',
    components: {
        "form-item-template": () => import("./form-item-template.vue"),
    },
    props: {
        list: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
        }
    },
    created() {
    }
}
</script>
