<script>

import {email, required} from "vuelidate/lib/validators";
import {showError} from '@/plugins/global'

export default {
  name: 'AuthLogin',
  layout: 'auth',
  data: function () {
    return {
      submitted: false
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    user: {
      get() {
        return this.$store.getters['user/getUser']
      },
      set(value) {
        this.$store.commit('user/setUser', value)
      }
    }
  },
  methods: {
    signIn() {
      this.submitted = true
      // stop here if form is invalid
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.$store.dispatch('user/signIn', null)
          .then(() => {
            this.submitted = false
            this.$router.push({path: '/'})
          })
          .catch(() => {
            this.$toasted.global.defaultError({msg: ' Email or password incorrect!'})
          })
      }
    }
  }
}
</script>


<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                            <span class="logo-lg">
                              <h1 class="text-primary">NikoDay <i class=" fas fa-smile-beam"></i></h1>
                              <!--                                <img src="~/assets/images/logo-dark.png" alt="" height="22">-->
                            </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                            <span class="logo-lg">
                              <h1 class="text-white">NikoDay <i class=" fas fa-smile-beam"></i></h1>
                              <!--                                <img src="~/assets/images/logo-light.png" alt="" height="22">-->
                            </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3">Enter your email address and password to access admin panel.</p>
          </div>

          <div>
            <!--            <b-alert :variant="notification.type" class="mt-3" v-if="notification.message"-->
            <!--                     :show="notificationAutoCloseDuration" dismissible>{{ notification.message }}-->
            <!--            </b-alert>-->

            <!--            <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration"-->
            <!--                     dismissible>{{ authError }}-->
            <!--            </b-alert>-->
            <div class="form-group mb-3">
              <label for="emailaddress">Email address</label>
              <input class="form-control" v-model="user.email" type="email" id="emailaddress"
                     placeholder="Enter your email"
                     :class="{ 'is-invalid': submitted && $v.user.email.$error }">
              <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                <span v-if="!$v.user.email.required">Email is required.</span>
                <span v-if="!$v.user.email.email">Please enter valid email.</span>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <div class="input-group input-group-merge">
                <input v-model="user.password" type="password" id="password" class="form-control"
                       placeholder="Enter your password"
                       :class="{ 'is-invalid': submitted && $v.user.password.$error }">

                <div class="input-group-append" data-password="false">
                  <div class="input-group-text">
                    <span class="password-eye"></span>
                  </div>
                </div>
                <div v-if="submitted && !$v.user.password.required" class="invalid-feedback">Password is required.</div>
              </div>
            </div>

            <div class="form-group mb-3">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox-signin" checked>
                <label class="custom-control-label" for="checkbox-signin">Remember me</label>
              </div>
            </div>

            <div class="form-group mb-0 text-center">
              <button class="btn btn-primary btn-block" type="submit" @click="signIn"> Log In</button>
            </div>

          </div>

          <div class="text-center">

          </div>

        </div> <!-- end card-body -->
      </div>
      <!-- end card -->

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p>
            <nuxt-link to="/forgot-password" class="text-muted ml-1">Forgot your password?</nuxt-link>
          </p>
          <p class="text-muted">Don't have an account?
            <nuxt-link to="/register" class="text-primary font-weight-medium ml-1">Sign Up</nuxt-link>
          </p>
        </div> <!-- end col -->
      </div>
      <!-- end row -->

    </div> <!-- end col -->
  </div>
  <!-- end row -->
</template>


<style>
</style>
