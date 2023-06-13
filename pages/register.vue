<template>
    <div class="login-wrapper w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 m-auto flex flex-col justify-start sm:justify-center mt-8 mb-10">

        <div class="bg-white shadow-lg rounded-lg">
            <h2 class="font-bold text-3xl bg-slate-200 text-slate-700 text-center py-4 rounded-t-md">REGISTER</h2>
            <Form id="form" class="py-5 px-7" :validation-schema="schema" @submit="handleRegister">
                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="text"
                    id="name"
                    name="name" 
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.name"
                    />
                    <label for="name" class="absolute duration-300 top-3 origin-0 text-gray-500">Name*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="name"/>
                </div>

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
                <div class="relative z-0 w-full mb-5">
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
                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="password" 
                    id="confirmpassword"
                    name="confirmPassword"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    />
                    <label for="confirmpassword" class="absolute duration-300 top-3 origin-0 text-gray-500">Confirm Password*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="confirmPassword"/>
                </div>
                <div class="w-full mb-5">
                        <div class="w-full flex">
                            <label for="role" class="text-gray-500">Role:* </label>
                            <Field
                            name="role"
                            as="select"
                            id="role"
                            placeholder="Choose"
                            class="text-slate-800 ml-3 pl-1 pb-1 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                            v-model="inputData.role"
                            >
                                <option value="admin">Admin</option>
                                <option value="employee">Employee</option>
                                <option value="customer">Customer</option>
                            </Field>
                        </div>
                        <ErrorMessage class="text-red-600 text-sm" name="role"/>
                </div>
                <div class="w-full mb-7">
                    <Field
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    class="mr-1"
                    v-model="inputData.gender"
                    />
                    <label for="male" class="">Male</label>

                    <Field
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    class="ml-2 mr-1"
                    v-model="inputData.gender"
                    />
                    <label for="female" class="">Female</label>

                    <Field
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    class="ml-2 mr-1"
                    v-model="inputData.gender"
                    />
                    <label for="other" class="">Other</label>

                    <ErrorMessage class="text-red-600 text-sm block pt-1" name="gender"/>
                </div>

                <div class="relative z-0 w-full mb-3">
                    <Field
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="inputData.dob"
                    />
                    <label for="dob" class="absolute duration-300 top-3 origin-0 text-gray-500">Date Of Birth*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="dob"/>
                </div>

                <div class="relative z-0 w-full mb-5">
                    <Field
                    type="number"
                    disabled
                    id="age"
                    name="age"
                    placeholder=" "
                    class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                    v-model="getAge"
                    />
                    <label for="age" class="absolute duration-300 top-3 origin-0 text-gray-500">Age*</label>
                    <ErrorMessage class="text-red-600 text-sm" name="age"/>
                </div>

                <button type="submit" v-show="!showLoading" class="my-1 px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Register</button>
                <img v-show="showLoading" class="bg-slate-600 rounded-lg px-3 w-16 h-11 object-contain" src="images/spinner.gif" alt="Loading" />
            </Form>
        </div>
    </div>
</template>

<script setup>
    import { useAuthStore } from '~/stores/authStore';

    const schema = {
        name: "required|min:2|max:20",
        email: "required|email",
        password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[\\W_]).+$",
        confirmPassword: "required|confirmed:@password",
        role: "required",
        gender: "required",
        dob: "required|dob"
    };

    const inputData = reactive({
        name: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        dob: ""
    })

    const getAge = computed(() => {
        return new Date().getFullYear() - new Date(inputData.dob).getFullYear();
    });

    const router = useRouter();
    const authStore = useAuthStore();

    let showLoading = ref(false);

    async function handleRegister() {
        showLoading.value = true;

        inputData.age = getAge;
        try {
            await authStore.register(inputData);

            router.push("/login");
        }
        catch (error) {
            alert("Error! " + error);
        }

        showLoading.value = false;
    }
</script>