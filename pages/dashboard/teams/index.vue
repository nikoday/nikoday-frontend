<script>

export default {
  name: 'Teams',
  head() {
    return {
      title: `My Teams | NikoDay`,
    };
  },
  middleware: 'router-auth',
  data: function () {
    return {
      title: "My Teams",
      teams: {}
    }
  },
  computed: {
    waitingForResponse: {
      get() {
        return this.$store.getters['team/getWaitingForResponse']
      },
      set(value) {
        this.$store.commit('team/setWaitingForResponse', value)
      }
    }
  },
  methods: {
    async getTeams() {
      this.waitingForResponse = true
      this.$axios.get('/teams')
        .then(response => {
            if (response && response.data) {
              this.teams = response.data
            }
            this.waitingForResponse = false
          }
        )
    }
  },
  mounted() {
    let user = this.$store.getters['user/getUser']
    if (user && user.token) {
      this.getTeams()
    } else {
      this.$router.push({path: '/auth'})
    }
  }
}
</script>


<style>
</style>

<template>
  <div>
    <PageHeader :title="$t('page-title.my-teams')"/>

    <div class="row">
      <router-link to="/new-team">
        <b-button variant="info"
                  style="margin: 10px"
                  v-b-tooltip.hover
                  title="Create New Team">
          <i class="fa fa-plus" aria-hidden="true"></i> New Team
        </b-button>
      </router-link>
    </div>

    <div class="row">
      <div v-for="item in teams" :key="item.id" class="col-lg-4">
        <router-link :to="'/team/' + item.id">
          <div class="card ribbon-box">
            <div class="card-body">
              <div :class="`ribbon ribbon-primary float-left`">
                <i :class="`mdi mdi-account-group mr-1`"></i>
                {{ item.name }}
              </div>
              <h5 :class="`text-primary float-right mt-0`">Total: 8 </h5>
              <div class="ribbon-content">
                <p class="mb-0">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->


  </div>
</template>
