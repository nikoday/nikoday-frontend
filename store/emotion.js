const state = () => ({
  emotion: {},
  waitingForResponse: false
})

const getters = {
  getEmotion(state) {
    return state.emotion;
  },
  getWaitingForResponse(state) {
    return state.waitingForResponse;
  }
}

const mutations = {
  setEmotion(state, payload) {
    state.emotion = payload
  },
  setWaitingForResponse(state, payload) {
    state.waitingForResponse = payload
  }
}


const actions = {
  loadEagerFullEmotion(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setEmotion', {})
    return new Promise(async (resolve, reject) => {
      this.$axios.get(`/emotion/${payload.id}?eager=true`)
        .then(response => {
          //Ordena columns por weight ASC;
          if (response.data.columns)
            response.data.columns = response.data.columns.sort((a, b) => a.weight - b.weight);
          context.commit('setEmotion', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  loadEmotion(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setEmotion', {})
    return new Promise((resolve, reject) => {
      this.$axios.get(`/emotion/${payload.id}`)
        .then(response => {
          context.commit('setEmotion', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  insertEmotion(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.post(`/emotion`, context.getters.getEmotion)
        .then(response => {
          context.commit('setEmotion', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  updateEmotion(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      let emotion = context.getters.getEmotion
      this.$axios.put(`/emotion/${emotion.id}`, emotion)
        .then(response => {
          context.commit('setEmotion', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  deleteEmotion(context, payload) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/emotion/${payload.id}`)
        .then(() => {
          context.commit('setEmotion', {})
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
