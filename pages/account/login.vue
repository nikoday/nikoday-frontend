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
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$store.dispatch('user/signIn', null)
          .then(() => {
            this.$router.push({path: '/'})
          })
          .catch(() => {
            this.$toasted.global.defaultError({msg:' email ou senha incorreto!'})
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
                                <img src="~/assets/images/logo-dark.png" alt="" height="22">
                            </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                            <span class="logo-lg">
                                <img src="~/assets/images/logo-light.png" alt="" height="22">
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
            <nuxt-link to="/account/forgot-password" class="text-muted ml-1">Forgot your password?</nuxt-link>
          </p>
          <p class="text-muted">Don't have an account?
            <nuxt-link to="/account/register" class="text-primary font-weight-medium ml-1">Sign Up</nuxt-link>
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


<!--<script>-->
<!--import {-->
<!--  required,-->
<!--  email-->
<!--} from "vuelidate/lib/validators";-->

<!--&lt;!&ndash;/**&ndash;&gt;-->
<!--&lt;!&ndash; * Login component&ndash;&gt;-->
<!--&lt;!&ndash; */&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;  name: 'Auth',&ndash;&gt;-->
<!--&lt;!&ndash;  data() {&ndash;&gt;-->
<!--&lt;!&ndash;    return {&ndash;&gt;-->
<!--&lt;!&ndash;      email: "nikoday@nikoday.com",&ndash;&gt;-->
<!--&lt;!&ndash;      password: "123456",&ndash;&gt;-->
<!--&lt;!&ndash;      submitted: false,&ndash;&gt;-->
<!--&lt;!&ndash;      authError: null,&ndash;&gt;-->
<!--&lt;!&ndash;      tryingToLogIn: false,&ndash;&gt;-->
<!--&lt;!&ndash;      isAuthError: false,&ndash;&gt;-->
<!--&lt;!&ndash;    };&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  computed: {&ndash;&gt;-->
<!--&lt;!&ndash;    notification() {&ndash;&gt;-->
<!--&lt;!&ndash;      return this.$store ? this.$store.state.notification : null;&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    notificationAutoCloseDuration() {&ndash;&gt;-->
<!--&lt;!&ndash;      return this.$store && this.$store.state.notification ? 5 : 0;&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  created() {&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  validations: {&ndash;&gt;-->
<!--&lt;!&ndash;    email: {&ndash;&gt;-->
<!--&lt;!&ndash;      required,&ndash;&gt;-->
<!--&lt;!&ndash;      email&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    password: {&ndash;&gt;-->
<!--&lt;!&ndash;      required&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  methods: {&ndash;&gt;-->
<!--&lt;!&ndash;    // Try to log the user in with the username&ndash;&gt;-->
<!--&lt;!&ndash;    // and password they provided.&ndash;&gt;-->
<!--&lt;!&ndash;    tryToLogIn() {&ndash;&gt;-->
<!--&lt;!&ndash;      this.submitted = true;&ndash;&gt;-->
<!--&lt;!&ndash;      // stop here if form is invalid&ndash;&gt;-->
<!--&lt;!&ndash;      this.$v.$touch();&ndash;&gt;-->

<!--&lt;!&ndash;      if (this.$v.$invalid) {&ndash;&gt;-->
<!--&lt;!&ndash;        return;&ndash;&gt;-->
<!--&lt;!&ndash;      } else {&ndash;&gt;-->
<!--&lt;!&ndash;        if (process.env.auth === "firebase") {&ndash;&gt;-->
<!--&lt;!&ndash;          this.tryingToLogIn = true;&ndash;&gt;-->
<!--&lt;!&ndash;          // Reset the authError if it existed.&ndash;&gt;-->
<!--&lt;!&ndash;          this.authError = null;&ndash;&gt;-->
<!--&lt;!&ndash;          return (&ndash;&gt;-->
<!--&lt;!&ndash;            this.$store.dispatch('auth/logIn', {&ndash;&gt;-->
<!--&lt;!&ndash;              email: this.email,&ndash;&gt;-->
<!--&lt;!&ndash;              password: this.password,&ndash;&gt;-->
<!--&lt;!&ndash;            })&ndash;&gt;-->
<!--&lt;!&ndash;              // eslint-disable-next-line no-unused-vars&ndash;&gt;-->
<!--&lt;!&ndash;              .then((token) => {&ndash;&gt;-->
<!--&lt;!&ndash;                this.tryingToLogIn = false;&ndash;&gt;-->
<!--&lt;!&ndash;                this.isAuthError = false;&ndash;&gt;-->
<!--&lt;!&ndash;                // Redirect to the originally requested page, or to the home page&ndash;&gt;-->
<!--&lt;!&ndash;                this.$router.push(&ndash;&gt;-->
<!--&lt;!&ndash;                  this.$route.query.redirectFrom || {&ndash;&gt;-->
<!--&lt;!&ndash;                    path: "/"&ndash;&gt;-->
<!--&lt;!&ndash;                  }&ndash;&gt;-->
<!--&lt;!&ndash;                );&ndash;&gt;-->
<!--&lt;!&ndash;              })&ndash;&gt;-->
<!--&lt;!&ndash;              .catch((error) => {&ndash;&gt;-->
<!--&lt;!&ndash;                this.tryingToLogIn = false;&ndash;&gt;-->
<!--&lt;!&ndash;                this.authError = error ? error : "";&ndash;&gt;-->
<!--&lt;!&ndash;                this.isAuthError = true;&ndash;&gt;-->
<!--&lt;!&ndash;              })&ndash;&gt;-->
<!--&lt;!&ndash;          );&ndash;&gt;-->
<!--&lt;!&ndash;        } else if (process.env.auth === "fakebackend") {&ndash;&gt;-->
<!--&lt;!&ndash;          const {&ndash;&gt;-->
<!--&lt;!&ndash;            email,&ndash;&gt;-->
<!--&lt;!&ndash;            password&ndash;&gt;-->
<!--&lt;!&ndash;          } = this;&ndash;&gt;-->
<!--&lt;!&ndash;          if (email && password) {&ndash;&gt;-->
<!--&lt;!&ndash;            this.$store.dispatch('authfack/login', {&ndash;&gt;-->
<!--&lt;!&ndash;              email,&ndash;&gt;-->
<!--&lt;!&ndash;              password&ndash;&gt;-->
<!--&lt;!&ndash;            });&ndash;&gt;-->
<!--&lt;!&ndash;            this.$store.dispatch('notification/clear')&ndash;&gt;-->
<!--&lt;!&ndash;          }&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;      }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;  },&ndash;&gt;-->
<!--&lt;!&ndash;  layout: 'auth'&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->
