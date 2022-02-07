<template>
  <div class="settings">
    <b-form :state="validation" @submit="onSubmit" novalidate validated>
        <b-form-group id="input-group-email" label="Email address:" label-for="input-email" description="We'll never share your email with anyone else.">
            <b-form-input id="input-email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-password" label="Your password:" label-for="input-password">
            <b-form-input id="input-password" v-model="form.password" type="password" placeholder="Enter password" minlength="3" maxlength="15" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Settings",

    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            validation: null
        }
    },

    methods: {
        ...mapActions(['updateUserInfo']),

        onSubmit(event) {
            event.preventDefault();
            if (this.validation === false) {
                alert('yo');
            }
            // this.updateUserInfo(this.form);
            // this.$router.push({name: 'Home'});
        }
    }
};
</script>

<style scoped>
.settings {
    width: 30%;
    margin: 20px auto 0;
    background-color: rgb(101, 202, 206);
    border: 5px solid black;
    padding: 50px;
}
</style>