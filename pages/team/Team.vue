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
  <div class="board">

    <router-link :to="'/edit-team/' + id">
      <b-button variant="info"
                style="margin: 10px"
                v-b-tooltip.hover
                title="Edit Team">
        <i class="fa fa-pencil" aria-hidden="true"></i> Edit Team
      </b-button>
    </router-link>
  </div>
</template>


<style>
</style>
