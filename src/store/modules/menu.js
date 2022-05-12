import { generatorDynamicRoutes } from '@/router/route-dynamic'

const initRoutes = [{
  path: '/',
  children: []
}]

const menu = {
  state: {
    routes: [...initRoutes],
    components: {}
  },

  mutations: {
    SET_ROUTES: (state, data) => {
      state.routes = data
    },
    INIT_ROUTES: (state) => {
      state.routes = [...initRoutes]
    },
    SET_COMPONENTS: (state, components = {}) => {
      state.components = components
    }
  },

  actions: {
    // 获取菜单
    queryMenus ({ commit }, data) {
      return generatorDynamicRoutes(data)
        .then(data => {
          commit('SET_ROUTES', data)
          return data
        })
    }
  }
}

export default menu
