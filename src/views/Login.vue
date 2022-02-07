<template>
  <div id="app">
    <h3>Log into an existing account</h3>
    <b-form @submit="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input id="email" v-model="form.email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Log in</b-button>
    </b-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Login',

    data() {
      return {
        form: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();

        this.login(this.form);
        this.$router.push({ name: 'Home' });
      }
    }
  }
</script>

<style scoped>
    #app {
        width: 30%;
        margin: 50px auto 100px;
    }

    #email, #password {
        margin-bottom: 10px;
    }

    h3 {
      margin-bottom: 40px;
    }
</style>
