const state = () => ({
  teamUser: {},
  waitingForResponse: false
})

const getters = {
  getTeamUser(state) {
    return state.teamUser;
  },
  getWaitingForResponse(state) {
    return state.waitingForResponse;
  }
}

const mutations = {
  setTeamUser(state, payload) {
    state.teamUser = payload
  },
  setWaitingForResponse(state, payload) {
    state.waitingForResponse = payload
  }
}


const actions = {
  loadEagerFullTeamUser(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTeamUser', {})
    return new Promise(async (resolve, reject) => {
      this.$axios.get(`/team-user/${payload.id}?eager=true`)
        .then(response => {
          //Ordena columns por weight ASC;
          if (response.data.columns)
            response.data.columns = response.data.columns.sort((a, b) => a.weight - b.weight);
          context.commit('setTeamUser', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  loadTeamUser(context, payload) {
    context.commit('setWaitingForResponse', true)
    context.commit('setTeamUser', {})
    return new Promise((resolve, reject) => {
      this.$axios.get(`/team-user/${payload.id}`)
        .then(response => {
          context.commit('setTeamUser', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  insertTeamUser(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.post(`/team-user`, context.getters.getTeamUser)
        .then(response => {
          context.commit('setTeamUser', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  updateTeamUser(context) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      let teamUser = context.getters.getTeamUser
      this.$axios.put(`/team-user/${teamUser.id}`, teamUser)
        .then(response => {
          context.commit('setTeamUser', response.data)
          context.commit('setWaitingForResponse', false)
          resolve()
        })
        .catch(error => {
          context.commit('setWaitingForResponse', false)
          reject(error)
        })
    })
  },
  deleteTeamUser(context, payload) {
    context.commit('setWaitingForResponse', true)
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/team-user/${payload.id}`)
        .then(() => {
          context.commit('setTeamUser', {})
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
