<template>
  <div class="cards">
    <b-card-group deck v-for="car in cars" :key="car.id">
        <b-card no-body class="overflow-hidden" style="max-width: 540px; margin: 20px; border: 2px solid white;" bg-variant="dark" text-variant="light">
            <b-row no-gutters>
                <b-col md="6">
                    <b-card-img :src="car.image" alt="Image" class="rounded-0" style="border: 1px solid white;"></b-card-img>
                    <router-link :to="{ name: 'Reviews', query: {id: car.id, image: car.image, name: car.manufacturer + ' ' + car.model + ' ' + car.year, rating: car.rating } }">
                      <b-form-rating v-model="car.rating" variant="warning" style="background-color: black; color: white;" readonly show-value precision="2"></b-form-rating>
                    </router-link>
                </b-col>

                <b-col md="6">
                    <b-card-body :title="car.manufacturer + ' ' + car.model + ' ' + car.year">
                        <em class="price">€{{car.pricePerDay}}!</em>
                        <b-button variant="success" @click="book(car.id)">Book now!</b-button>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CarList",

  computed: {
    ...mapState(["cars", "token"]),
  },

  mounted() {
    this.getAllCars();
  },

  methods: {
    ...mapActions(['getAllCars']),

    book(carId) {
        if (!this.token) {
            this.$bvToast.toast('Please log in first', {
                title: 'Unable to book',
                noAutoHide: true,
                variant: 'warning',
                toaster: 'b-toaster-top-center',
                solid: true
            })
        } else {
            this.$router.push({name: 'Single', params: {id: carId}})
        }
    }
  },
};
</script>

<style scoped>
.cards {
    width: 90%;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill,minmax(400px, 1fr));
    margin: 30px;
}
.price {
    display: block;
    font-size: large;
    color: #09b309;
    background-color: #0722278c;
    width: 50%;
    margin: 0 auto 10px;
}
</style>