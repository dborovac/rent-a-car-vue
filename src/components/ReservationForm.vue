<template>
<div class="form">
    <label for="startDate">Pick-up date:</label>
    <b-form-datepicker id="startDate" v-model="startDateValue" :min="new Date()" class="mb-2"></b-form-datepicker>
    <label for="endDate">Return date:</label>
    <b-form-datepicker id="endDate" v-model="endDateValue" :min="startDateValue" class="mb-2"></b-form-datepicker>
    <b-button :disabled="bookButtonDisabled" variant="success" @click="bookReservation()">Book</b-button>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: 'ReservationForm',

    data() {
        return {
            startDateValue: null,
            endDateValue: null,
            bookButtonDisabled: true
        }
    },

    computed: {
        ...mapState(['userId'])
    },

    props: {
        carId: Number
    },

    methods: {
        ...mapActions(['postReservation']),

        bookReservation() {
            const reservation = {
                startDate: this.startDateValue,
                endDate: this.endDateValue,
                carId: this.carId,
                userId: this.userId
            }
            this.postReservation(reservation);
            this.$router.push({name: 'Reservations'});
        }
    },

    watch: {
        startDateValue: function(newVal) {
            if (this.endDateValue !== null && newVal !== null) {
                this.bookButtonDisabled = false;
            }
        },
        endDateValue: function(newVal) {
            if (this.startDateValue !== null && newVal !== null) {
                this.bookButtonDisabled = false;
            }
        }
    }
}
</script>

<style scoped>
.form {
    width: 50%;
    margin: 10px auto 10px;
}
</style>