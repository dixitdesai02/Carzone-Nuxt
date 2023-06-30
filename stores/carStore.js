export const useCarStore = defineStore('carStore', {
    state: () => {
        return {
            cars: [],
            baseURL: import.meta.env.VITE_CARS_API_BASEURL
        }
    },

    getters: {
        carDetailsById: (state) => (id) => {
            return state.cars.find((car) => car.id == id)
        } 
    },

    actions: {
        async fetchCars() {
            try {
                const data = await $fetch(`${this.baseURL}`)
                this.cars = data.data;
            }
            catch(error) {
                throw new Error("Error! Could not fetch Cars Data!" + error);
            }
        },

        async addCar(carData) {
            try {
                await useFetch(`${this.baseURL}`, {
                    headers: { "Content-type": "application/json" },
                    method: 'POST',
                    body: carData
                });
                await this.fetchCars();
            }
            catch (error) {
                throw new Error("Car could not be Added!");
            }
        },

        async editCar(id, carData) {
            try {
                const {data} = await useFetch(`${this.baseURL}/${id}`, {
                    headers: { "Content-type": "application/json" },
                    method: 'PUT',
                    body: carData
                });
                console.log("data", data);
                await this.fetchCars();
            }
            catch(error) {
                throw new Error("Car Could not be Updated!");
            }
        },

        async deleteCar(id) {
            try {
                await useFetch(`${this.baseURL}/${id}`, {
                    method: 'DELETE'
                });
                await this.fetchCars();
            }
            catch(error) {
                throw new Error('Car could not be Deleted!'); 
            }
        }
    }
})