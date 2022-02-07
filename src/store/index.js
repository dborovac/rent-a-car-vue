import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        cars: [],
        reservations: [],
        userId: null,
        userEmail: null
    },

    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.token = token;
        },

        removeToken(state) {
            state.token = '';
            localStorage.token = '';
        },

        setUserId(state, userId) {
            state.userId = userId;
        },

        setUserEmail(state, userEmail) {
            state.userEmail = userEmail;
        },

        setCarList(state, cars) {
            state.cars = cars;
        },

        addCar(state, car) {
            state.cars.push(car);
        },

        setReservationList(state, reservations) {
            state.reservations = reservations;
        },

        addReservation(state, reservation) {
            state.reservations.push(reservation);
        },

        removeReservation(state, id) {
            state.reservations = state.reservations.filter(reservation => reservation.id !== id);
        }
    },

    actions: {
        register({ commit }, obj) {
            fetch('http://127.0.0.1:65533/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(handleErrors).then(res => res.json())
                .then(tkn => {
                    commit('setToken', tkn.token);
                    commit('setUserId', tkn.userId);
                    commit('setUserEmail', tkn.userEmail);
                });
        },

        login({ commit }, obj) {
            fetch('http://127.0.0.1:65533/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(obj)
            }).then(handleErrors).then(res => res.json())
                .then(tkn => {
                    commit('setToken', tkn.token);
                    commit('setUserId', tkn.userId);
                    commit('setUserEmail', tkn.userEmail);
                });
        },

        getAllCars({ commit }) {
            fetch('http://127.0.0.1:65535/api/cars')
                .then(handleErrors).then(res => res.json())
                .then(data => commit('setCarList', data.data));
        },

        getCarById({ commit, state }, id) {
            return new Promise((resolve, reject) => {
                const car = state.cars.filter(car => car.id == id)[0];
                if (car) {
                    resolve(car);
                } else {
                    fetch(`http://127.0.0.1:65535/api/cars/${id}`)
                        .then(handleErrors).then(res => res.json())
                        .then(data => {
                            commit('addCar', data);
                            resolve(data);
                        })
                        .catch(error => reject(error));
                }
            })
        },

        getCarDetails({ state }, id) {
            return new Promise((resolve, reject) => {
                const car = state.cars.filter(car => car.id == id)[0];
                fetch(`http://127.0.0.1:65535/api/cardetails/${car.detailsId}`, {
                    headers: {'Authorization': 'Bearer ' + state.token}
                }).then(handleErrors).then(res => res.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
            })
        },

        getReservationsForUser({ commit, state }) {
            fetch('http://127.0.0.1:65535/api/reservations', {
                headers: {'Authorization': 'Bearer ' + state.token}
            }).then(handleErrors).then(res => res.json())
            .then(data => {
                const reservations = data.data.filter(reservation => reservation.userId == state.userId);
                commit('setReservationList', reservations);
            });
        },

        postReservation({ commit, state }, reservation) {
            fetch('http://127.0.0.1:65535/api/reservations', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.token},
                body: JSON.stringify({startDate: reservation.startDate, endDate: reservation.endDate, carId: reservation.carId, userId: reservation.userId})
            }).then(handleErrors).then(res => res.json())
            .then(data => commit('addReservation', data.reservation));
        },

        cancelReservation({ commit, state }, id) {
            fetch(`http://127.0.0.1:65535/api/reservations/${id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.token},
                body: JSON.stringify({userId: state.userId})
            }).then(handleErrors).then(() => commit('removeReservation', id));
        },

        updateUserInfo({ commit, state }, user) {
            fetch(`http://127.0.0.1:65535/api/users/${state.userId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + state.token},
                body: JSON.stringify({email: user.email, password: user.password, userId: state.userId, role: 'Client'})
            }).then(handleErrors).then(res => res.json())
            .then(data => commit('setUserEmail', data.email))
        }
    }
})

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
