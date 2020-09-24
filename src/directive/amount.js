/**
 * vue 金额输入限制
 * 
 * 全局注册
 * import amountDirective  from './directive/amount'
 * Vue.use(amountDirective);
 * v-amount 默认值[10,2] 同样可用在input元素上
 * integerLen 整数最大长度
 * floatLen 小数最大长度
 * modelObj 绑定的对象,搭配modelKey使用（默认绑定v-model的值）
 * modelKey 绑定的对象中的属性
 * triggerAmount 是否绑定事件 值为false时过滤指令  默认绑定
 * 优先级: modelObj + modelKey > v-model="key";
 *        integerLen + floatLen > v-amount="[10,2]"
 * A、<el-input v-amount v-model="key" /></el-input>  
 * B、<el-input v-amount="[10,2]" v-model="formDate.key" /></el-input>
 * C、<el-input v-amount="[10,2]" :modelObj="modelObj" :modelKey="modelKey"/></el-input> 数组遍历出来的组件使用这种方式
 * D、<el-input v-amount integerLen="10" floatLen="2"/></el-input>
 */

function inputHandle (event) {
    event = window.event||event
    let target = event.target || event.srcElement
    let floatReg = this.floatReg;
    let integerLen = this.integerLen;
    let floatLen = this.floatLen;

    let oldvalue = this.oldvalue;

    if (oldvalue && oldvalue.split('.')[0].length == integerLen && target.value.length > oldvalue.length && target.value.indexOf('.') == -1) {
        target.value = oldvalue
        this.value = oldvalue;
    }
    if (oldvalue && oldvalue.split('.')[1] && oldvalue.split('.')[1].length == floatLen && target.value.length > oldvalue.length && target.value.indexOf('.') == -1) {
        target.value = oldvalue
        this.value = oldvalue;
    }
    
    let val = target.value;

    if(this.floatLen == 0) {
        val = val.replace(/[^\d]/g, ""); //清除"数字以外的字符
    } else {
        val = val.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
    }
    
    val = val.replace(/^\./g, ""); //验证第一个字符是数字
    val = val.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
    val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    val = val.replace(floatReg, '$1$2.$3'); //只能输入floatLen个小数
    val = val.indexOf(".") > 0 ? val.split(".")[0].substring(0, integerLen) + "." + val.split(".")[1] : val.substring(0, integerLen); //只能输入integerLen个正整数
    
    Vue.prototype.$nextTick(() => {

        target.value = val;
        this.oldvalue = val;
        this.value = val;
    
        // // 更新组件v-model数据
        // console.log(this.modelObj, this.modelKey)
        if(this.modelObj && this.modelKey) {
            Vue.prototype.$set(this.modelObj, this.modelKey, this.value)
        } else if(this.expression) {
            let keys = this.expression.split('.')
            let len = keys.length;

            if(len) {
                let obj = this.context;
                let i = 0;
                while(i < len-1) {
                    obj = obj[keys[i]]
                    i ++;
                }
                Vue.prototype.$set(obj, keys.slice(-1)[0], this.value)
            }
        }
    })
}


let  inserted = (el, binding, vnode) => {
    if(vnode.data.attrs.triggerAmount === false) {
        return;
    }
    // console.log(el, binding, vnode)
    const input = el.tagName === 'INPUT' ? el : el.querySelector('input');

    input.integerLen = vnode.data.attrs.integerLen != undefined ?  vnode.data.attrs.integerLen : binding.expression? JSON.parse(binding.expression)[0] : 10;
    input.floatLen = vnode.data.attrs.floatLen != undefined ? vnode.data.attrs.floatLen : binding.expression? JSON.parse(binding.expression)[1] : 2;

    input.context = vnode.context;
    input.arg = binding.arg;
    input.expression = (vnode.data.model && vnode.data.model.expression) ? vnode.data.model.expression : '';

    if(vnode.data && vnode.data.attrs && vnode.data.attrs.modelObj && vnode.data.attrs.modelKey) {
        input.modelObj = vnode.data.attrs.modelObj;
        input.modelKey = vnode.data.attrs.modelKey;
    }

    let floatStr = '';

    for (let i = 0; i < input.floatLen; i++) {
        floatStr += `\\d`;
    }

    input.floatReg = new RegExp(`^(\\-)*(\\d+)\\.(${floatStr}).*$`)

    input.oldvalue = '';
    
    input.addEventListener('input', inputHandle)
}

let  unbind = (el, binding, vnode) => {
    const input = el.tagName === 'INPUT' ? el : el.querySelector('input');

    input.removeEventListener('input', inputHandle)
}

const hookFn = {
    inserted,
    unbind,
}

import Vue from 'vue';
module.exports = {
    amountDirective: {
        install(Vue, options = {}) {
            Vue.directive('amount', hookFn);
        }
    },
    inputHandle,
}