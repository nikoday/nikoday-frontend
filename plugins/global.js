export function showError(e) {
  if (e && e.response && e.response.data) {
    this.$toast.global.defaultError({msg: e.response.data})
  } else if (typeof e === 'string') {
    this.$toast.global.defaultError({msg: e})
  } else {
    this.$toast.global.defaultError()
  }
}


export default ({app}, inject) => {
  // Inject showError(e) in Vue, context and store.
  inject('showError', showError)
}
