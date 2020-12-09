const state = () => ({
  team: {},
  waitingForResponse: false
})

const getters = {
  getTeam(state) {
    return state.team;
  },
  getWaitingForResponse(state) {
    return state.waitingForResponse;
  }
}

const mutations = {
  setTeam(state, payload) {
    state.team = payload
  },
  setWaitingForResponse(state, payload) {
    state.waitingForResponse = payload
  }
}


const actions = {
  loadEagerFullTeam(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTeam', {})
    return new Promise(async (resolve, reject) => {
      this.$axios.get(`/team/${payload.id}?eager=true`)
        .then(response => {
          //Ordena columns por weight ASC;
          if (response.data.columns)
            response.data.columns = response.data.columns.sort((a, b) => a.weight - b.weight);
          context.commit('setTeam', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  loadTeam(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTeam', {})
    return new Promise((resolve, reject) => {
      this.$axios.get(`/team/${payload.id}`)
        .then(response => {
          context.commit('setTeam', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  insertTeam(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.post(`/team`, context.getters.getTeam)
        .then(response => {
          context.commit('setTeam', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  updateTeam(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      let team = context.getters.getTeam
      this.$axios.put(`/team/${team.id}`, team)
        .then(response => {
          context.commit('setTeam', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  deleteTeam(context, payload) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/team/${payload.id}`)
        .then(() => {
          context.commit('setTeam', {})
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
