import { login, logout, queryUser } from '@/api/user'

const initState = {
  // 用来做是否已登录的标识，前端自己维护这个状态，登录成功后设置为 true，登出之后设置为 false
  logged: false,
  // 这里返回具体的权限点信息，然后通过 v-action 或者 $auth 进行权限判断
  permissions: [],
  // 用户名称
  nickname: ''
}

const user = {
  state: {
    ...initState
  },

  mutations: {
    SET_USER: (state, data) => {
      Object.entries(data).forEach(([key, value]) => {
        state[key] = value
      })
      state.logged = true
    },
    INIT_STATE: (state, data) => {
      Object.entries(initState).forEach(([key, value]) => {
        state[key] = value
      })
      state.logged = false
    }
  },

  actions: {
    // 登录
    login ({ commit }, data) {
      return login(data)
        .then(res => {
          const data = res.data || {}
          commit('SET_USER', data)
          return res
        })
    },
    // 登出
    logout ({ commit }, data) {
      return logout(data)
        .then(res => {})
    },
    // 获取用户信息
    queryUser ({ commit }, data) {
      return queryUser(data)
        .then(res => {
          const data = res.data || {}
          commit('SET_USER', data)
          return data
        })
    }
  }
}

export default user
