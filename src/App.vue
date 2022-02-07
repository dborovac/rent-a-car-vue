<template>
  <div id="app">
    <b-navbar toggleable="sm" type="dark" variant="faded" id="nav">
      <b-navbar-brand to="/">
        <img src="https://icons.iconarchive.com/icons/icons8/windows-8/256/Transport-Steering-Wheel-icon.png" alt="Wheel" class="d-inline-block" style="max-width: 40px; margin-right: 10px;">
        Rent-a-Car
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item v-if="token" to="/reservations">My reservations</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
          <b-nav-item v-if="!token" to="/login">Log in</b-nav-item>

          <b-avatar v-if="token" variant="light" size="1.5rem" style="margin-top: 9px;"></b-avatar>

          <b-nav-item-dropdown v-if="token" :text="userEmail" right>
            <b-dropdown-item v-if="token" to="/settings" style="padding:0;">
              <b-avatar class="mr-2" size="1.5rem" icon="gear-fill" variant="dark"></b-avatar>
              <span class="mr-auto">Settings</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="token" @click="logout()">
              <b-avatar class="mr-2" size="1.5rem" icon="arrow-bar-down" variant="danger"></b-avatar>
              <span class="mr-auto">Sign out</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
// import { mapActions, mapState, mapMutations } from "vuex";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",

  computed: {
    ...mapState(["token", "userEmail"]),
  },

  mounted() {
    if (localStorage.token) {
      this.setToken(localStorage.token);
    }
  },

  methods: {
    ...mapMutations(["removeToken", "setToken"]),

    logout() {
      this.removeToken();
      this.$router.push({name: 'Home'});
    },
  },

  sockets: {
    error(err) {
      alert(err);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
html, #app {
  background-color: #0c3941;
}
#nav {
  border-bottom: 1px solid white;
}
</style>
