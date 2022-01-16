const initState = {
  logs: []
}

const errorLog = {
  state: {
    ...initState
  },

  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
      state.logs.splice(0)
    }
  },

  actions: {
    addErrorLog ({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    },
    clearErrorLog ({ commit }) {
      commit('CLEAR_ERROR_LOG')
    }
  }
}

export default errorLog
