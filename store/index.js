const cookieparser = process.server ? require('cookieparser') : undefined
// 在服务器渲染期间用的都是同一个实例
// 为了防止冲突，state定义成一个函数返回一个对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  nuxtServerInit({ commit}, {req}) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {

      }
    }

    commit('setUser', user)
  }
}