import Vue from 'vue'
import Vuex from 'vuex'

import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search 
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
})
