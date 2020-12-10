<script>

import {
  mapState, mapGetters
} from 'vuex'

/**
 * Topbar component
 */
export default {
  computed: mapState('user', ['user']),
  data: function () {
    return {
      languages: [{
        flag: require("~/assets/images/flags/us.jpg"),
        language: "en",
        title: "English",
      },
        {
          flag: require("~/assets/images/flags/pt-br.png"),
          language: "pt",
          title: "Português",
        }
      ],
      current_language: this.$i18n.locale,
      text: null,
      flag: null,
      value: null,
    }
  },
  mounted() {
    this.value = this.languages.find((x) => x.language === this.$i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
  },
  created() {
    this.validateToken()
  },
  methods: {
    /**
     * Toggle menu
     */
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    /**
     * Set languages
     */
    setLanguage(locale, country, flag) {
      this.$i18n.locale = locale;
      this.current_language = locale;
      this.text = country;
      this.flag = flag;
    },
    /**
     * Horizontal-toggle menu
     */
    horizonalmenu() {
      let element = document.getElementById("topnav-menu-content");
      element.classList.toggle("show");
    },
    /**
     * Logout user
     */
    async logout() {
      this.$store.dispatch('user/logout', null).then(() => {
        this.$router.push({path: '/auth'})
      })
    },
    async validateToken() {
      this.$store.dispatch('user/validateToken', null).then((valid) => {
        if (!valid) {
          this.$router.push({path: '/auth'})
        }
      })
    }
  }
};
</script>

<template>
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <div class="container-fluid">
      <ul class="list-unstyled topnav-menu float-right mb-0">

        <b-nav-item-dropdown variant="white" class="d-none d-lg-inline-block" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16"/>
            {{ text }}
          </template>
          <b-dropdown-item class="notify-item" v-for="(entry, i) in languages" :key="`Lang${i}`" :value="entry"
                           @click="setLanguage(entry.language, entry.title, entry.flag)"
                           :link-class="{'active': entry.language === current_language}">
            <img :src="`${entry.flag}`" alt="user-image" class="mr-1" height="12"/>
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right class="notification-list topbar-dropdown" menu-class="profile-dropdown"
                             toggle-class="p-0">
          <template slot="button-content" class="nav-link dropdown-toggle">
            <div class="nav-user mr-0">
              <img src="~/assets/images/users/avatar-1.jpg" alt="user-image" class="rounded-circle"/>
              <span class="pro-user-name ml-1">
                            {{ user.username }}
                            <i class="mdi mdi-chevron-down"></i>
                        </span>
            </div>
          </template>

          <b-dropdown-header>
            <h6 class="text-overflow m-0 py-2">{{ user.email }}</h6>
          </b-dropdown-header>

          <b-dropdown-item href="#">
            <i class="remixicon-account-circle-line"></i>
            <span>{{ $t('navbar.dropdown.name.list.account') }}</span>
          </b-dropdown-item>

          <b-dropdown-item href="#">
            <i class="remixicon-settings-3-line"></i>
            <span>{{ $t('navbar.dropdown.name.list.settings') }}</span>
          </b-dropdown-item>

          <b-dropdown-divider></b-dropdown-divider>
          <a class="dropdown-item" @click="logout" href="javascript: void(0);">
            <i class="fe-log-out mr-1"></i>
            <span>{{ $t('navbar.dropdown.name.list.logout') }}</span>
          </a>
        </b-nav-item-dropdown>
      </ul>

      <!-- LOGO -->
      <div class="logo-box">
        <nuxt-link to="/" class="logo logo-dark text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm-dark.png" alt height="24"/>
                  <!-- <span class="logo-lg-text-light">NikoDay</span> -->
                </span>
          <span class="logo-lg">
                    <img src="~/assets/images/logo-dark.png" alt height="20"/>
            <!-- <span class="logo-lg-text-light">M</span> -->
                </span>
        </nuxt-link>

        <nuxt-link to="/" class="logo logo-light text-center">
                <span class="logo-sm">
                    <img src="~/assets/images/logo-sm.png" alt height="24"/>
                </span>
          <span class="logo-lg">
                    <img src="~/assets/images/logo-light.png" alt height="20"/>
                </span>
        </nuxt-link>
      </div>

      <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
        <li>
          <button class="button-menu-mobile waves-effect waves-light" @click="toggleMenu">
            <i class="fe-menu"></i>
          </button>
        </li>

        <li>
          <!-- Mobile menu toggle (Horizontal Layout)-->
          <a class="navbar-toggle nav-link" data-toggle="collapse" @click="horizonalmenu()"
             data-target="#topnav-menu-content">
            <div class="lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
          <!-- End mobile menu toggle-->
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
  </div>
  <!-- end Topbar -->
</template>
