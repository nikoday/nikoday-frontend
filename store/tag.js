const state = () => ({
  tag: {},
  waitingForResponse: false
})

const getters = {
  getTag(state) {
    return state.tag;
  },
  getWaitingForResponse(state) {
    return state.waitingForResponse;
  }
}

const mutations = {
  setTag(state, payload) {
    state.tag = payload
  },
  setWaitingForResponse(state, payload) {
    state.waitingForResponse = payload
  }
}


const actions = {
  loadEagerFullTag(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTag', {})
    return new Promise(async (resolve, reject) => {
      this.$axios.get(`/tag/${payload.id}?eager=true`)
        .then(response => {
          //Ordena columns por weight ASC;
          if (response.data.columns)
            response.data.columns = response.data.columns.sort((a, b) => a.weight - b.weight);
          context.commit('setTag', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  loadTag(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTag', {})
    return new Promise((resolve, reject) => {
      this.$axios.get(`/tag/${payload.id}`)
        .then(response => {
          context.commit('setTag', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  insertTag(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.post(`/tag`, context.getters.getTag)
        .then(response => {
          context.commit('setTag', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  updateTag(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      let tag = context.getters.getTag
      this.$axios.put(`/tag/${tag.id}`, tag)
        .then(response => {
          context.commit('setTag', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  deleteTag(context, payload) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/tag/${payload.id}`)
        .then(() => {
          context.commit('setTag', {})
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
