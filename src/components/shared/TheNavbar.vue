<template>
  <nav class="navbar is-spaced" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="'/'">
        <h1 class="title is-4">VueMeetuper</h1>
      </router-link>
      <a @click="openBurger()"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="['navbar-menu', 'is-mobile', {'is-active': isOpen}]">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="'/'"> Home </router-link>

        <router-link :to="{ name: 'PageMeetupFind' }" class="navbar-item">
          Find
        </router-link>

        <div :class="['navbar-item', 'has-dropdown', 'is-hoverable', 'is-mobile', {'is-active': isMoreOpen}]">
        <!-- <div class="navbar-item has-dropdown is-hoverable is-mobile"> -->
          <a @click="openMore()" class="navbar-link"> More </a>

          <div class="navbar-dropdown">
            <router-link :to="{name: 'PageAbout'}" class="navbar-item"> About </router-link>
            
            <hr class="navbar-divider" />
            <a href="https://www.facebook.com/ardit.hyseni.11" class="navbar-item"> Report an issue </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="user">Welcome {{ user.username }}</div>
        </div>
        <div v-if="user" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Account </a>
          <div class="navbar-dropdown">
            <router-link :to="{name: 'PageProfile'}" class="navbar-item"> Profile </router-link>
            <hr class="navbar-divider" />
            <a @click.prevent="logOut" class="navbar-item"> Logout </a>
          </div>
        </div>
        <div v-else class="navbar-item has-dropdown">
          <div class="buttons">
            <router-link
              :to="{ name: 'PageRegister' }"
              class="button is-primary"
            >
              <strong>Sign up</strong>
            </router-link>
            <router-link :to="{ name: 'PageLogin' }" class="button is-info">
              <strong>Log in</strong>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {

  computed: {
    ...mapGetters({
      user: "auth/authUser",
    }),
  },

  data () {
    return {
      isOpen: false,
      isMoreOpen: false,
    }
  },

  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
        .then(() => {
          this.$router.push('/')
        })
    },
    openBurger () {
      this.isOpen = !this.isOpen
    },
    openMore() {
      this.isMoreOpen = !this.isMoreOpen
    }
  }, 

};
</script>

<style scoped lang="scss">
.navbar {
 background-image: linear-gradient(60deg, #abecd6 0%, #fbed96 100%);
}
</style>
