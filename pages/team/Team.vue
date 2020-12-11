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
      <b-button variant="primary"
                style="margin: 10px"
                v-b-tooltip.hover
                title="Edit Team">
        <i class="fa fa-pencil" aria-hidden="true"></i> Edit Team
      </b-button>
    </router-link>

    <router-link :to="'/edit-team-user/' + id">
      <b-button variant="secondary"
                style="margin: 10px"
                v-b-tooltip.hover
                title="Edit Team">
        <i class="fa fa-pencil" aria-hidden="true"></i> Config Team Users
      </b-button>
    </router-link>

    <b-tabs content-class>
      <b-tab title="Niko Niko Calendar" active>
        <p>{{ text }}</p>
        <p class="mb-0">{{ content }}</p>
      </b-tab>
      <b-tab title="Team Users">
        <p>{{ content }}</p>
        <p class="mb-0">{{ text }}</p>
      </b-tab>
      <b-tab title="Graphics">
        <p>{{ content }}</p>
        <p class="mb-0">{{ text }}</p>
      </b-tab>
    </b-tabs>

  </div>
</template>


<style>
</style>
