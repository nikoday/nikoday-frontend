<script>

export default {
  name: 'Team',
  props: ['id'],
  data: function () {
    return {}
  },
  computed: {
    board: {
      get() {
        return this.$store.getters['team/getTeam']
      },
      set(value) {
        this.$store.commit('team/setTeam', value)
      }
    }
  },
  methods: {
    async loadTeam() {
      this.$store.dispatch('team/loadTeam', {id: this.id}).then(() => {
      })
    }
  },
  mounted() {
    this.loadTeam()
  }

}
</script>


<template>

</template>


<style>
</style>
