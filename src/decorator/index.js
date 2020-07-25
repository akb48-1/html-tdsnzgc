import axios from '@/http/axios';
import { deepClone } from '@/util';
/*
    作用：提前加载资源
    参数：key => 组件内使用的数据 this[key]。
         url => 资源接口地址。

    使用展示:
    export default {
    @loadData([{
        key: 'classifyList',
        url: '/classify/queryAll',
    }, {
        key: 'unitList',
        url: '/unit/queryAll',
    }])
    data(){ return {} }
    }
 */
export function loadData(arr = []) {

    var newData = {};
    arr.forEach(item => {
        if (item.url) {
            newData[item.key] = [];
            axios({
                method: item.method || 'post',
                url: item.url,
            }).then(res => {
                newData[item.key].push(...res.data)
            })
        }
    })

    return function(target, key, descriptor) {
        /* 重点 不可变更 */
        var oldData = descriptor.value()
        descriptor.value = function() {
            return Object.assign(deepClone(oldData), newData)
                // return Object.assign(JSON.parse(JSON.stringify(oldData)), newData)
        }
        return descriptor;
    }

}



/*
    作用：二次提交确认
    参数：msg => 提示框的提示语。

    使用展示: 
    @confirmTips("启动搜索?", "info")
    formSearch() {
        ...doSomething
    }
 */
export function confirmTips(msg = '确定执行此操作？', type = 'warning') {

    return function(target, key, descriptor) {

        let orignEvent = descriptor.value;

        descriptor.value = function(...args) {

            this.$confirm(msg, '提示', {
                    type: type
                })
                .then(orignEvent.bind(this, ...args))
                .catch((err) => {})
        }

        return descriptor;
    }
}

export function confirmWinGen(msg = '确定执行此操作？', type = 'warning') {

    return function(target, key, descriptor) {

        let orignEvent = descriptor.value;

        descriptor.value = function(...args) {

            this.$confirm(msg, '提示', {
                type: type,
                loading: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        orignEvent.call(this, ...args).then(() => {
                            done()
                        }).finally(() => {
                            instance.confirmButtonLoading = false;
                        })
                    } else {
                        done();
                    }
                },
            })
        }

        return descriptor;
    }
}



/* 
    作用：dialog 表单提交前需通过验证
    参数：formRef => 对应 this.$refs[formRef]。
    使用展示:
    @validate('dialogForm')
    confirmEvent(...args) {
      this.submit({...params}, ...args);
    }
 */
export function validate(formRef) {

    return function(target, key, descriptor) {

        let orignEvent = descriptor.value;

        descriptor.value = function(...args) {
            return new Promise((resolve, reject) => {
                this.$refs[formRef].validate(valid => {
                    if (valid) {
                        orignEvent.call(this, ...args, resolve, reject)
                    } else {
                        reject()
                    }
                })
            })

        }

        return descriptor;
    }
}

/*
    作用：函数防抖
    参数：delay => 减少执行频率（只执行最后一次）。
    使用展示:
    @debounce(1000)
    inputHandle(value) {
      console.log(value)
    }
 */
export function debounce(delay = 500) {

    return function(target, key, descriptor) {

        let orignEvent = descriptor.value;

        let timer = null;

        descriptor.value = function(...args) {

            if (timer) {

                clearTimeout(timer)

            }

            timer = setTimeout(orignEvent.bind(this, ...args), delay);

        }

        return descriptor;
    }
}


/*
    作用：函数节流
    参数：delay => 减少执行频率（一段时间内只执行一次）。
    使用展示:
    @throttle(1000)
    inputHandle(value) {
      console.log(value)
    }
 */
export function throttle(delay = 500) {

    let running = false;

    return function(target, key, descriptor) {

        let orignEvent = descriptor.value;

        descriptor.value = function(...args) {

            if (running) {

                return;

            }

            running = true;

            setTimeout(() => {

                orignEvent.call(this, ...args)

                running = false;

            }, delay);
        }

        return descriptor;
    }
}