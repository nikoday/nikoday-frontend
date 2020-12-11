<template>
  <div class="edit-new-team">
    <CrudPageTitle icon="mdi mdi-account-group" :main="mainTitle" :sub="subTitle" style="text-align: center"/>
    <b-container>
      <b-form @submit.stop.prevent v-if="show">
        <b-form-group
          id="team-name-group"
          label="Team Name:"
          label-for="team-name">
          <b-form-input
            id="team-name"
            v-model.trim="team.name"
            type="text"
            :state="validation('name')"
            placeholder="Enter team name"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation('name')">
            Name must contain 3 to 25 characters.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="team-description-group" label="Description:" label-for="team-description">
          <b-form-textarea
            id="team-description"
            v-model="team.description"
            placeholder="Type a description, what team does...."
            rows="3"
            max-rows="50"
          ></b-form-textarea>
        </b-form-group>
        <hr>
        <b-row>
          <b-col cols="12" sm="6">
            <router-link :to="isNewTeam ? '/' : '/team/' + id ">
              <b-button
                @click="confirmed = true"
                variant="secondary"
                v-b-tooltip.hover
                title="Back to previous screen">
                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Back
              </b-button>
            </router-link>
          </b-col>

          <b-col cols="12" sm="6" :style=" ($mq === 'xs') ? 'margin-top: 20px;' : ''">
            <b-button type="reset"
                      class="float-right"
                      @click.prevent="clear"
                      v-if="isNewTeam"
                      variant="danger"
                      v-b-tooltip.hover
                      title="Clear Form">
              <span><i class="fa fa-eraser" aria-hidden="true"></i> Clear</span>
            </b-button>
            <b-button type="submit"
                      class="float-right"
                      @click.prevent="remove"
                      v-if="!isNewTeam"
                      variant="danger"
                      v-b-tooltip.hover
                      title="Delete Team">
              <span><i class="fa fa-times" aria-hidden="true"></i> Delete</span>
            </b-button>
            <b-button type="submit"
                      class="float-right"
                      @click.prevent="save"
                      :disabled="!validation('name')"
                      variant="primary"
                      style="margin-right: 10px"
                      v-b-tooltip.hover
                      title="Save Team Data">
              <span><i class="fa fa-check" aria-hidden="true"></i> Save</span>
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </div>
</template>

<script>
//   import PageTitle from '../template/PageTitle'

export default {
  name: 'EditTeam',
  //components: {PageTitle},
  props: ['id'],
  data: function () {
    return {
      show: true,
      confirmed: false
    }
  },
  computed: {
    isNewTeam() {
      return !this.id;
    },
    mainTitle() {
      return 'Team'
    },
    subTitle() {
      return this.isNewTeam ? 'Create New Team' : ('Edit Team #' + this.team.name)
    },
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
    validation(fieldName) {
      switch (fieldName) {
        case 'name':
          if (this.team.name) {
            return this.team.name.length > 3 && this.team.name.length <= 25
          } else {
            return false;
          }
        case 'description':
          if (this.team.description) {
            return this.team.description.length >= 0 && this.team.description.length <= 50
          } else {
            return null;
          }
        default:
          throw new Error("Nome do campo incorreto.")
      }
    },
    save(event) {
      event.preventDefault()
      this.confirmed = true
      //alert(JSON.stringify(this.team))
      if (this.isNewTeam) {
        this.insertTeam()
        this.$router.push({path: '/'})
      } else {
        this.updateTeam()
      }

    },
    remove(event) {
      event.preventDefault()
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete the team?', {
        titleHtml: '<i class="fa fa-question-circle" aria-hidden="true"></i> Confirmation',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-3',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.confirmed = true
            if (!this.isNewTeam) {
              this.deleteTeam()
              this.$router.push({path: '/'})
            }
          }
        })
        .catch(() => {
        })
    },
    clear(event) {
      event.preventDefault()
      this.team = {}
      this.show = false
      this.confirmed = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    loadTeam() {
      this.$store.dispatch('team/loadTeam', {id: this.id}).then()
    },
    insertTeam() {
      this.$store.dispatch('team/insertTeam').then(() => {
        this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' successfully inserted!'})
      })
    },
    updateTeam() {
      this.$store.dispatch('team/updateTeam').then(() => {
        this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' #' + this.team.name + ' Successfully changed!'})
      })
    },
    deleteTeam() {
      this.$store.dispatch('team/deleteTeam', {id: this.id}).then(() => {
        this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' #' + this.team.name + ' Successfully deleted!'})
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.confirmed) {
      next()
    } else {
      if (confirm('Are you sure?')) {
        next()
      } else {
        next(false)
      }
    }
  },
  mounted() {
    this.team = {}
    if (!this.isNewTeam) {
      this.loadTeam()
    }
  }
}
</script>

<style>
</style>
