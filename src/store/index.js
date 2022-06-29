import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert:{},
    globalSearchHolder:"",
    searchResultArr:[],
  },
  getters: {
    getAlert(state){
      return state.alert
    },
    getGlobalSearchHolder(state){
      return state.globalSearchHolder;
    },
    getSearchResultArr(state){
      return state.searchResultArr;
    }
  },
  mutations: {
    setAlert(state,item){
      state.alert = item
    },
    setGlobalSearchHolder(state,item){
      state.globalSearchHolder = item;
    },
    setSearchResultArr(state,item){
      state.searchResultArr = item
    }
  },
  
})
