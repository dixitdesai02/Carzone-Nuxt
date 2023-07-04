<template>
    <section>
        <Loader v-show="isLoading"/>
        <section v-show="!isLoading" class="w-5/6 max-w-6xl m-auto">
            <div class="back mt-5 cursor-pointer" @click="goBack">
                <img src="/assets/images/back.svg" alt="back" class="w-10 h-10 object-cover" />
            </div>
            <transition name="fade">
                <div v-show="!isLoading" class="wrapper flex flex-col md:flex-row m-auto items-center bg-white p-5 rounded shadow-lg mt-10">
                    <div class="img-wrapper w-full md:w-2/3">
                        <img :src="carDetails?.image" alt="Car Image" class="car-image object-cover"/>
                    </div>
                    <div class="details-wrapper p-5 w-full md:w-1/3">
                        <h1 class="text-3xl font-bold text-slate-800">{{ carDetails?.name }}</h1>
                        <h3 class="text-lg text-slate-600 pt-5 break-words">{{ carDetails?.details }}</h3>
                        <h3 class="text-lg text-slate-800 font-semibold pt-5">$ {{ carDetails?.price }}</h3>
                    </div>
                </div>
            </transition>
        </section>
    </section>
</template>

<script setup>
useHead({
    title: "Car | CarZone"
});

import { useCarStore } from '@/stores/carStore';

let isLoading = ref(true);
let carDetails = reactive({});

const carStore = useCarStore();
const route = useRoute();

async function fetchData() {
    await carStore.fetchCars();
    carDetails = carStore.carDetailsById(route.params.id);

    if (!carDetails) {
        alert("Car Not Found!!");
        router.back();
    }
    isLoading.value = false;
}
fetchData();

const router = useRouter();

function goBack() {
    router.back();
}

</script>

<style scoped>
.fade-enter-active {
    transition: all 0.5s ease;
}

.fade-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

.car-image {
    max-width: 100%;
    width: 1500px;
    height: 500px;
    object-fit: cover;
}

@media screen and (max-width: 991px) {
    .car-image {
        width: 100%;
        height: 250px;   
        object-fit: cover;
    }
}
</style>