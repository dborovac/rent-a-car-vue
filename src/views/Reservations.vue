<template>
  <div class="wrapper">
    <b-table :items="reservations" :fields="fields" style="color: white; background-color: #e2942d; margin: 0">
      <template #cell(actions)="row">
        <b-button variant="danger" @click="$bvModal.show('my-modal'); bindCancelButton(row.item.id)">Cancel reservation</b-button>
      </template>
    </b-table>
    <b-modal id="my-modal" hide-footer hide-header>
      <div class="d-block text-center">
        <h4 style="margin: 20px 0;">Are you sure?</h4>
      </div>
      <b-button class="modalButton" @click="$bvModal.hide('my-modal')">Go back</b-button>
      <b-button class="modalButton" ref="cancelButton" variant="outline-danger">Cancel reservation</b-button>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Reservations",

  data() {
    return {
      fields: ["carId", "startDate", "endDate", {key: 'actions', label: 'Cancel'}],
    }
  },

  computed: {
    ...mapState(['reservations']),
  },

  methods: {
    ...mapActions(['getReservationsForUser', 'cancelReservation']),

    cancel(id) {
      this.cancelReservation(id);
      this.$bvModal.hide('my-modal');
    },

    bindCancelButton(id) {
      this.$nextTick(() => {
        this.$refs.cancelButton.addEventListener('click', this.cancel.bind(null, id));
      })
    }
  },

  mounted() {
    this.getReservationsForUser();
  },
};
</script>

<style scoped>
.wrapper {
  width: 80%;
  margin: 50px auto 50px;
  border: 4px solid white;
  font-size: 1.2rem;
}
.modalButton {
  margin-top: 10px;
  margin-left: 80px;
}
</style>