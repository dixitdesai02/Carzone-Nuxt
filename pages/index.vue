<template>
    <section>
        <main v-if="!isLoading"  class="w-5/6 max-w-screen-xl mx-auto">
            <div class="button-wrapper flex flex-row justify-center sm:justify-end">
                <button @click="showAddForm" class="mt-3 px-5 py-2 text-md font-semibold text-center text-slate-700 hover:bg-slate-300 bg-slate-200 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-400">
                    ADD CAR
                </button>
            </div>
            <section v-if="cars.length === 0" class="py-5 flex flex-col">
                <h2 class="text-4xl font-semibold text-slate-700 text-center">No Cars Found!</h2>
                <NuxtImg class="w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto" src="images/no-cars.webp" alt="No Cars" />
            </section>
            <section  class="pt-3 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center relative">
                <transition-group name="fade" appear>
                    <GalleryCard :style="{transitionDelay: `${index*0.15}s`}" v-for="(car, index) in cars" :car="car" :key="car.id"/>
                </transition-group>
            </section>
            <ModalForm />
        </main>
        <ClientOnly>
            <Loader v-if="isLoading" />
        </ClientOnly>
    </section>
</template>


<script setup>
    useHead({
        title: "CarZone"
    });

    import { storeToRefs } from "pinia";
    import { useCarStore } from "../stores/carStore";
    import { useModalStore } from "../stores/modalStore";

    let isLoading = ref(true);

    const carStore = useCarStore();
    const { cars } = storeToRefs(carStore);

    async function fetchData() {
        await carStore.fetchCars();
        isLoading.value = false;
    }
    
    fetchData();


    const modalStore = useModalStore();
    const { showModal, typeOfModal, editData } = storeToRefs(modalStore);

    function showAddForm() {
        showModal.value = true;
        typeOfModal.value = 'add';
        editData.value = {}
    }

</script>

<style scoped>
    .fade-enter-active {
        transition: all 0.2s ease-in-out;
    }

    .fade-enter-from {
        opacity: 0;
        transform: scale(0.8);
    }

    .fade-leave-active {
        transition: all 0.3s ease;
    }

    .fade-leave-to {
        opacity: 0;
        transform: translateY(-5rem);
    }
</style>