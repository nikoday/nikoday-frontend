<script>

export default {
  name: 'Team',
  props: ['id'],
  data: function () {
    return {
      simplePieChart: {
        data: {
          labels: ['Happy', 'Neutral', 'Sad'],
          series: [40, 25, 10]
        },
        options: {
          height: 300,
          showLabel: true
        }
      },
      simpleLineChart: {
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
          ]
        },
        options: {
          height: 300,
          fullWidth: true,
        }
      }
    }
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
        <p>{{ }}</p>
        <p class="mb-0">{{ }}</p>
      </b-tab>


      <b-tab title="Team Users">
        <p>{{ }}</p>
        <p class="mb-0">{{ }}</p>
      </b-tab>

      <b-tab title="Graphics">
        <div class="row">
          <b-col cols="12">
            <chartist ratio="ct-chart"
                      v-if="simpleLineChart.data"
                      :data="simpleLineChart.data"
                      :options="simpleLineChart.options"
                      type="Line"></chartist>
          </b-col>
        </div>
        <div class="row">
          <b-col cols="12">
            <chartist ratio="ct-chart"
                      v-if="simplePieChart.data"
                      :data="simplePieChart.data"
                      :options="simplePieChart.options"
                      type="Pie"></chartist>
          </b-col>
        </div>
      </b-tab>

    </b-tabs>

  </div>
</template>


<style>
</style>
