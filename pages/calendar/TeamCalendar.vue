<script>

export default {
  name: 'TeamCalendar',
  props: ['id'],
  head() {
    return {
      title: `Niko Niko Calendar | NikoDay`,
    };
  },
  middleware: 'router-auth',
  data: function () {
    return {
      title: "Niko Niko Calendar",
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
    //if (user && user.token) {
    this.getTeams()
    //} else {
    //  this.$router.push({path: '/auth'})
    //}
  }
}
</script>


<style>
</style>

<template>
  <div>
    <PageHeader :title="$t('page-title.calendar-team')"/>
    <div class="row">
      <div v-for="item in teams" :key="item.id" class="col-lg-4">
        <router-link :to="'/calendar/' + item.id">
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


<!--<template>-->
<!--  <div class="teams">-->
<!--    <b-container>-->
<!--      <router-link to="/new-calendar">-->
<!--        <b-button variant="info"-->
<!--                  style="margin: 10px"-->
<!--                  v-b-tooltip.hover-->
<!--                  title="Adicionar Novo Quadro">-->
<!--          <i class="fa fa-plus" aria-hidden="true"></i> Novo Quadro-->
<!--        </b-button>-->
<!--      </router-link>-->
<!--      <b-row>-->
<!--        <b-col class="col-teams" v-for="item in teams" v-bind:key="item.id">-->
<!--          <b-card no-body class="card-teams overflow-hidden" bg-variant="primary" text-variant="white">-->
<!--            <b-row no-gutters>-->
<!--              <b-col md="12">-->
<!--                <router-link :to="'/calendar/' + item.id" class="float-right">-->
<!--                  <b-button variant="light">-->
<!--                    <i class="fa fa-folder-open"-->
<!--                       v-b-tooltip.hover-->
<!--                       title="Abrir Quadro"-->
<!--                       aria-hidden="true"></i></b-button>-->
<!--                </router-link>-->
<!--              </b-col>-->
<!--              <b-col md="12">-->
<!--                <h3>{{ item.name }}</h3>-->
<!--              </b-col>-->
<!--              <b-col md="12">-->
<!--                <b-card-body>-->
<!--                  <b-card-text>-->
<!--                    {{ item.description }}-->
<!--                  </b-card-text>-->
<!--                </b-card-body>-->
<!--              </b-col>-->

<!--            </b-row>-->
<!--          </b-card>-->

<!--        </b-col>-->
<!--      </b-row>-->
<!--    </b-container>-->
<!--  </div>-->
<!--</template>-->
