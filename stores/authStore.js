export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            baseURL: import.meta.env.VITE_AUTH_API_BASEURL,
            users: [],
            isLoggedIn: false,
            loggedInUser: null
        }
    },

    actions: {
        async register(data) {
            try {
                await useFetch(`${this.baseURL}/resource/users`, {
                    headers: { "Content-type": "application/json" },
                    method: 'POST',
                    body: data
                });
            }
            catch (error) {
                throw new Error(error);
            }
        },

        async getAllUsers() {
            try {
                const { data } = await useFetch(`${this.baseURL}/resource/users`);
                this.users = data.value.data;
            }
            catch (error) {
                throw new Error("Could not get users data!");
            }
        },

        login(matchedUser) {
            this.isLoggedIn = true;
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('token', 'thisisyoursecrettoken');
            sessionStorage.setItem('loggedInUser', matchedUser.name)
            this.loggedInUser = matchedUser.name;
        },

        logout() {
            this.isLoggedIn = false;
            sessionStorage.setItem('isLoggedIn', false);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('loggedInUser');
            this.loggedInUser = null;
        },
    }
})