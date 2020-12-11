<script>

import Gravatar from 'vue-gravatar'

export default {
  name: 'Team',
  props: ['id'],
  components: {Gravatar},
  data: function () {
    return {
      contacts: [{
        profile: require("~/assets/images/users/avatar-3.jpg"),
        name: "Denver Barker",
        designation: "@Founder ",
        site: "websitename.com"
      },
        {
          name: "Robert McBride",
          designation: "@Webdesigner",
          site: "abcweb.com"
        },
        {
          profile: require("~/assets/images/users/avatar-4.jpg"),
          name: "Peter White",
          designation: "@Webdesigner",
          site: "mywebs.com"
        },
        {
          profile: require("~/assets/images/users/avatar-5.jpg"),
          name: "Ronald Myrick",
          designation: "@Director",
          site: "profileq.com"
        },
        {
          profile: require("~/assets/images/users/avatar-6.jpg"),
          name: "Paul Halpern",
          designation: "@Manager",
          site: "coolweb.com"
        },
        {
          profile: require("~/assets/images/users/avatar-7.jpg"),
          name: "Ricky Atwell",
          designation: "@Programmer",
          site: "supported.com"
        },
        {
          name: "James Richards",
          designation: "@Webdeveloper",
          site: "website.com"
        },
        {
          profile: require("~/assets/images/users/avatar-8.jpg"),
          name: "Charles Martinez",
          designation: "@Webdesigner",
          site: "demosite.com.com"
        }
      ],
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
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          series: [
            [12, 9, 7, 8, 5, 3, 0],
            [2, 1, 3.5, 7, 3, 2, 0],
            [1, 3, 4, 5, 6, 3, 0]
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
    team: {
      get() {
        return this.$store.getters['team/getTeam']
      },
      set(value) {
        this.$store.commit('team/setTeam', value)
      }
    }
  },
  methods: {
    async loadEagerFullTeam() {
      this.$store.dispatch('team/loadEagerFullTeam', {id: this.id}).then(() => {
      })
    }
  },
  mounted() {
    this.loadEagerFullTeam()
  }

}
</script>


<template>
  <div class="team">

    <router-link :to="'/edit-team/' + id">
      <b-button variant="primary"
                style="margin: 10px"
                v-b-tooltip.hover
                title="Edit Team">
        <i class="fa fa-pencil" aria-hidden="true"></i> Edit Team
      </b-button>
    </router-link>

    <b-tabs content-class>

      <b-tab title="Niko Niko Calendar" active>
        <p>{{ }}</p>
        <p class="mb-0">{{ }}</p>
      </b-tab>


      <b-tab title="Team Users">

        <div class="row mb-2">
          <div class="col-sm-4">
            <a href="javascript:void(0);" class="btn btn-danger mb-2"><i class="mdi mdi-plus-circle mr-2"></i> Add
              New</a>
          </div>
          <div class="col-sm-8">
            <div class="float-sm-right">
              <form class="form-inline">
                <div class="form-group mr-2">
                  <label for="membersearch-input" class="sr-only">Search</label>
                  <input type="search" class="form-control" id="membersearch-input" placeholder="Search...">
                </div>
                <router-link :to="'/edit-team-user/' + id">
                  <button type="button" class="btn btn-success mb-2 mb-sm-0" alt="Config Team Users">
                    <i class="mdi mdi-cog"></i></button>
                </router-link>
              </form>

            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-3 col-sm-6" v-for="( teamUsers, index) in team.teamUsers" :key="index">
            <div class="text-center card">
              <div class="card-body">

                <b-dropdown class="float-right" variant="black" toggle-class="text-body p-0" right>
                  <template v-slot:button-content>
                    <i class="mdi mdi-dots-vertical font-20"></i>
                  </template>
                  <b-dropdown-item>Edit</b-dropdown-item>
                  <b-dropdown-item>Remove</b-dropdown-item>
                </b-dropdown>
                <Gravatar :email="teamUsers.user.email"
                          alt="profile-image"
                          class="rounded-circle img-thumbnail avatar-xl mt-1"/>

                <!--                <img v-if="teamUsers.profile" :src="teamUsers.profile" class="rounded-circle img-thumbnail avatar-xl mt-1"-->
                <!--                     alt="profile-image">-->
                <!--                <div class="avatar-xl mx-auto mt-1" v-if="!teamUsers.profile">-->
                <!--                  <div class="avatar-title bg-light rounded-circle">-->
                <!--                    <i class="mdi mdi-account h1 m-0 text-body"></i>-->
                <!--                  </div>-->
                <!--                </div>-->
                <h4 class="mt-3 mb-1">
                  <nuxt-link to="/contacts/profile" class="text-dark">{{ teamUsers.user.username }}</nuxt-link>
                </h4>
                <p class="text-muted">{{ teamUsers.user.email }}</p>
                <div class="text-muted">
                  <li v-for="role in teamUsers.roles" :key="role">
                    {{ role }}
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>


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
