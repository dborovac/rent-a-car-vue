<template>
    <div class="wrapper">
        <b-card title="Make a reservation" style="margin: 20px; border: 1px solid white;" bg-variant="dark" text-variant="light">
            <b-card-img :src="car.image" style="max-width: 460px; margin-bottom: 20px;"></b-card-img>
            <b-card-text>
                <ul>
                    <li>Manufacturer: {{car.manufacturer}}</li>
                    <li>Model: {{car.model}}</li>
                    <li>Year: {{car.year}}</li>
                    <li>Doors: {{details.doors}}</li>
                    <li>Fuel: {{details.fuel}}</li>
                    <li>Transmission: {{details.transmission}}</li>
                </ul>
                <b-button variant="success" @click="next=!next">Next</b-button>
            </b-card-text>
            <reservation-form :carId="car.id" v-if="next" />
        </b-card>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import ReservationForm from '../components/ReservationForm.vue';

export default {
    name: "Single",

    components: { ReservationForm },

    data() {
        return {
            car: {},
            details: {},
            next: false
        };
    },

    mounted() {
        this.getCarById(this.$route.params.id).then(car => this.car = car);
        this.getCarDetails(this.$route.params.id).then(details => this.details = details);
    },

    methods: {
        ...mapActions(['getCarById', 'getCarDetails'])
    }
}
</script>

<style scoped>
    .wrapper {
        width: 50%;
        margin: 20px auto 100px;
        /* justify-content: center; */
    }
</style>