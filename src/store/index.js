import Vue from 'vue'
import Vuex from 'vuex'
import { getLocalStorage, setLocalStorage, MENULISTKEY } from '@/libs/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: getLocalStorage(MENULISTKEY) ? JSON.parse(getLocalStorage(MENULISTKEY)) : []
  },
  getters: {
    menuList: (state) => state.menuList
  },
  mutations: {
    setMenuList(state, payload) {
      state.menuList = payload;
      setLocalStorage(MENULISTKEY, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
