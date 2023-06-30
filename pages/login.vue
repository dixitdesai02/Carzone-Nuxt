<template>
    <div class="login-wrapper w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 m-auto flex flex-col justify-center h-3/5 mt-10 mb-10">

        <div class="bg-white shadow-lg rounded-lg">
            <h2 class="font-bold text-3xl bg-slate-200 text-slate-700 text-center py-4 rounded-t-md">LOGIN</h2>
            <Form id="form" class="py-5 px-7" :validation-schema="schema" @submit="handleLogin">
                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.email"
                    />
                    <label for="email" class="absolute duration-300 top-3 origin-0 text-gray-500">Email Address*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="email"/>
                </div>
                <div class="relative z-0 w-full mb-2">
                    <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.password"
                    />
                    <label for="password" class="absolute duration-300 top-3 origin-0 text-gray-500">Password*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="password"/>
                </div>

                <div class="text-slate-500 flex justify-end">
                    <small>* indicates required field</small>
                </div>

                <button type="submit" v-show="!showLoading" class="my-1 z-50 px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Login</button>
                <img v-show="showLoading" class="bg-slate-600 rounded-lg px-3 w-16 h-11 object-contain" src="images/spinner.gif" alt="Loading" />

            </Form>
        </div>
        <div class="text-center text-slate-700 text-sm mt-3">
            New to CarZone? <NuxtLink to="/register" class="text-sky-700 cursor-pointer hover:underline">Register</NuxtLink>
        </div>
    </div>
</template>

<script setup>
    useHead({
        title: "Login | CarZone"
    });

    import { useAuthStore } from '@/stores/authStore';
    
    const schema = {
        email: "required|email",
        password: "required"
    };

    const inputData = reactive({
        email: "",
        password: ""
    });

    let showLoading = ref(false);

    const router = useRouter();
    const authStore = useAuthStore();
    
    async function handleLogin() {
        try {
            showLoading = true;

            await authStore.getAllUsers();

            let matchedUser = authStore.users.find((user) => ( user.email === inputData.email && user.password === inputData.password ));

            if (matchedUser) {
                authStore.login(matchedUser);
            }
            else {
                throw new Error("Invalid Credentials!");
            }

            router.push("/");
        }
        catch(error) {
            alert(error);
        }    
        showLoading = false;
    }

</script>