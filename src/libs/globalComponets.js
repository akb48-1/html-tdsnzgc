import Vue from 'vue';

const globalComponets = [];

export function regGlobalComponet(name, module) {
    var regComName = name.replace('/', '').replace(/\//g, '-');

    if(regComName) {
        if(globalComponets.includes(regComName)) {
            return;
        } else {
            Vue.component(regComName, module)
            globalComponets.push(regComName)
        }
    }
    
    
}
