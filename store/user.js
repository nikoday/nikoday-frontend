export const userKey = '__niko_day_user'

const state = () => ({
  user: {},
  waitingForResponse: false
})

const getters = {
  getUser(state) {
    return state.user;
  },
  getValidatingToken(state) {
    return state.validatingToken;
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
    if (payload) {
      this.$axios.defaults.headers.common['Authorization'] = `${payload.token}`
    } else {
      delete this.$axios.defaults.headers.common['Authorization']
    }
  },
  setValidatingToken(state, payload) {
    state.validatingToken = payload
  }
}

const actions = {
  async validateToken(context) {
    return new Promise(async (resolve, reject) => {
      try {
        context.commit('setValidatingToken', true)
        const userData = JSON.parse(localStorage.getItem(userKey))
        context.commit('setUser', {})

        if (!userData || !userData.token) {
          context.commit('setValidatingToken', false)
          resolve(false)
        } else {
          context.commit('setUser', userData)
          const response = await this.$axios.post(`/validate-token`, userData)

          if (response.data) {
            context.commit('setUser', response.data)
            context.commit('setValidatingToken', false)
            resolve(true)
          } else {
            localStorage.removeItem(userKey)
            context.commit('setValidatingToken', false)
            resolve(false)
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  },
  signIn(context) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/sign-in`, context.getters.getUser)
        .then(response => {
          context.commit('setUser', response.data)
          localStorage.setItem(userKey, JSON.stringify(response.data))
          resolve()
        })
        .catch(reject)
    })
  },
  signUp(context) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`/sign-up`, context.getters.getUser)
        .then(() => {
          localStorage.removeItem(userKey)
          context.commit('setUser', {})
          resolve()
        })
        .catch(reject)
    })
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      try {
        localStorage.removeItem(userKey)
        context.commit('setUser', {})
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
