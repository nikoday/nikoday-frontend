const state = () => ({
  registry: {},
  waitingForResponse: false
})

const getters = {
  getRegistry(state) {
    return state.registry;
  },
  getWaitingForResponse(state) {
    return state.waitingForResponse;
  }
}

const mutations = {
  setRegistry(state, payload) {
    state.registry = payload
  },
  setWaitingForResponse(state, payload) {
    state.waitingForResponse = payload
  }
}


const actions = {
  loadEagerFullRegistry(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setRegistry', {})
    return new Promise(async (resolve, reject) => {
      this.$axios.get(`/registry/${payload.id}?eager=true`)
        .then(response => {
          //Ordena columns por weight ASC;
          if (response.data.columns)
            response.data.columns = response.data.columns.sort((a, b) => a.weight - b.weight);
          context.commit('setRegistry', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  loadRegistry(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setRegistry', {})
    return new Promise((resolve, reject) => {
      this.$axios.get(`/registry/${payload.id}`)
        .then(response => {
          context.commit('setRegistry', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  insertRegistry(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.post(`/registry`, context.getters.getRegistry)
        .then(response => {
          context.commit('setRegistry', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  updateRegistry(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      let registry = context.getters.getRegistry
      this.$axios.put(`/registry/${registry.id}`, registry)
        .then(response => {
          context.commit('setRegistry', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  deleteRegistry(context, payload) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/registry/${payload.id}`)
        .then(() => {
          context.commit('setRegistry', {})
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
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
