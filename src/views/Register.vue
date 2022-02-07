<template>
  <div id="app">
    <h3>Register a new account</h3>
    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",

  data() {
    return {
      form: {
        email: "",
        password: "",
        role: 'Client',
      },
    };
  },

  methods: {
    ...mapActions(['register']),

    onSubmit(e) {
      e.preventDefault();

      this.register(this.form);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
#app {
  width: 30%;
  margin: 50px auto 100px;
}

#email,
#password {
  margin-bottom: 10px;
}

h3 {
  margin-bottom: 40px;
}
</style>
