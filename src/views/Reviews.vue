<template>
    <div class="wrapper">
        <b-card-img :src="car.image" alt="Image" class="rounded-0" style="border: 1px solid white; margin-bottom: 10px; max-width: 450px;"></b-card-img>
        <h2 style="margin: 20px 0;">{{car.name}}</h2>
        <div class="reviewForm">
            <h4>Leave a review</h4>
            <b-form-rating v-model="car.rating" variant="warning" show-value precision="2"></b-form-rating>
            <b-form-textarea v-model="comment" placeholder="Your message" rows="5" max-rows="8" style="margin-top: 10px;"></b-form-textarea>
            <b-button @click="onSubmit" variant="outline-success" style="margin-top: 10px;">Submit</b-button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Reviews',

    data() {
        return {
            car: null,
            comment: null
        }
    },

    computed: {
      ...mapState([
        'token'
      ])
    },

    mounted() {
        this.car = this.$route.query;
    },

    methods: {
        onSubmit() {
            alert('submitted');
            this.$socket.emit('review', {
                body: 'Yo whats up',
                token: this.token
            })
        }
    }
}
</script>

<style scoped>
.wrapper {
    width: 40%;
    margin: 0 auto 0;
}
.reviewForm {
    width: 75%;
    margin: 0 auto 0;
}
</style>