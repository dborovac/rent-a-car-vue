<template>
    <div class="wrapper">
        <b-card-img :src="car.image" alt="Image" class="rounded-0" style="border: 1px solid white; margin-bottom: 10px; max-width: 450px;"></b-card-img>
        <h2 style="margin: 20px 0;">{{car.name}}</h2>
        <div class="reviewForm">
            <h4>Leave a review</h4>
            <b-form-rating v-model="rating" variant="warning" show-value></b-form-rating>
            <b-form-textarea v-model="comment" placeholder="Your message" rows="5" max-rows="8" style="margin-top: 10px;"></b-form-textarea>
            <b-button @click="onSubmit" variant="outline-success" style="margin-top: 10px;">Submit</b-button>
        </div>
        <div class="reviews" v-if="reviews">
            <b-card v-for="review in reviews" :key="review.userEmail" header-tag="header">
                <template #header>
                    <h6 class="mb-0">{{ review.userEmail }} {{ review.rating }}&#11088;</h6>
                </template>
                <b-card-text>{{ review.comment }}</b-card-text>
            </b-card>
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
            comment: null,
            rating: null
        }
    },

    computed: {
      ...mapState([
        'token', 'userEmail', 'cars'
      ]),

      reviews: function () {
          return this.cars.filter(car => car.id === this.$route.query.id)[0].reviews;
      }
    },

    mounted() {
        this.car = this.$route.query;
    },

    methods: {
        onSubmit() {
            if (this.rating == null) {
                alert("Please supply a rating.");
            } else {
                this.$socket.emit('review', {
                    rating: this.rating,
                    comment: this.comment,
                    carId: this.car.id,
                    userEmail: this.userEmail,
                    token: this.token
                });
            }
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
.reviews {
    color: black;
    width: 60%;
    margin: 20px auto 20px;
}
</style>