<template>
    <div id="app">
        <CarList />
        <div v-if="token"></div>
        <div v-else></div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import CarList from '../components/CarList.vue';

export default {
  components: { CarList },
    name: "Home",

    computed: {
        ...mapState(['token']),
    },
};

</script>
