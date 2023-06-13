<template>
    <transition name="modal-transition" :duration="{ enter: 400, leave: 100 }" mode="out-in"> 
    <div class="fixed inset-0 z-40 bg-black bg-opacity-50" v-if="showModal">

        <div class="inner z-50">   
    
          <div class="bg-white w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto shadow-lg rounded-lg mt-20" @click.stop>
    
            <div class="p-4 sm:py-6 sm:px-12">
                <div class="mx-auto max-w-md bg-white border-0 sm:rounded-3xl">
                    <Form id="form" :validation-schema="schema" @submit="handleSubmit">
                        <div class="flex justify-between mb-4">
                            <h3 class="text-2xl font-bold text-slate-700 pb-2"><span v-if="typeOfModal === 'add'">ADD</span> <span v-else>EDIT</span> CAR</h3>
                            <button type="reset" class="text-gray-600 hover:text-gray-800 text-3xl" @click="closeModal">&times;</button>
                        </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field
                        type="text"
                        id="name"
                        name="name" 
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.name"
                        />
                        <label for="name" class="absolute duration-300 top-3 origin-0 text-gray-500">Name*</label>
                        <ErrorMessage class="text-red-600 text-sm" name="name"/>
                    </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field v-slot="{ field }" name="details" v-model="formData.details"> 
                            <textarea
                            v-bind="field"
                            name="details"
                            placeholder=" "
                            rows="3"
                            class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                            />
                        </Field>
                        <label for="email" class="absolute duration-300 top-3 origin-0 text-gray-500">Detail*</label>
                        <ErrorMessage class="text-red-600 text-sm" name="details"/>
                    </div>
    
                    <div class="relative z-0 w-full mb-5">
                        <Field
                        id="image"
                        name="image"
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.image"
                        />
                        <label for="image" class="absolute duration-300 top-3 origin-0 text-gray-500">Image URL*</label>
                        <ErrorMessage class="text-red-600 text-sm" name="image"/>
                    </div>
    

                    <div class="relative z-0 w-full mb-5">
                        <Field
                        type="number"
                        id="price"
                        name="price"
                        placeholder=" "
                        class="text-slate-800 pt-3 pb-2 pl-5 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-slate-600 border-gray-200"
                        v-model="formData.price"
                        />
                        <div class="absolute top-0 left-0 mt-3 ml-1 text-gray-400">$</div>
                        <label for="price" class="absolute duration-300 top-3 left-5 origin-0 text-gray-500">Car Price*</label>
                        <ErrorMessage class="text-red-600 text-sm" name="price"/>
                    </div>
    
                    <div class="mt-4 flex justify-end">
                        <button v-if="typeOfModal === 'add' && !showLoading" class="px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Save</button>
                        <button v-else-if="!showLoading" class="px-5 py-2 text-md font-bold text-center text-white bg-slate-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-slate-300">Update</button>
                        <img v-show="showLoading" class="bg-slate-600 rounded-lg px-3 w-16 object-contain" src="images/spinner.gif" alt="Loading" />
                        <button type="reset" class="bg-gray-300 text-gray-800 font-bold py-2 px-4 ml-2 rounded" @click="closeModal">Cancel</button>
                    </div>
    
                    </Form>
                </div>
                </div>
          </div>
        </div>
    </div>
</transition>
</template>


<script setup>
    import { ref, reactive, watch } from 'vue';
    import Swal from 'sweetalert2';
    import { useCarStore } from '../stores/carStore';
    import { useModalStore } from '../stores/modalStore';
    import { storeToRefs } from 'pinia';

    let formData = reactive({});

    const schema = {
        name: "required|min:3|max:50",
        details: "required|min:30|max:120",
        image: "required|url",
        price: "required|numeric|min_value:100|max_value:100000000"
    };

    let showLoading = ref(false)

    const modalStore = useModalStore();
    const { typeOfModal, editData, showModal } = storeToRefs(modalStore);

    function closeModal() {
        showModal.value = false;
    }

    watch(editData, (newValue) => {
        formData = {...newValue}
    }, { deep: true })

    const carStore = useCarStore();

    async function handleSubmit() {
        showLoading.value = true;
        if (typeOfModal.value === 'add') {
            try {
                await carStore.addCar(formData);
                notify();
            }
            catch(error) {
                alert(error)
            }
        }
        else {
            try {
                await carStore.editCar(formData.id, formData);
                notify();
            }
            catch(error) {
                alert(error)
            }
        }
        closeModal();
        showLoading.value = false;
    }

    function notify() {
        Swal.fire({
            title: `Car ${typeOfModal.value === 'add' ? 'Created': 'Updated'}!`,
            html: `
                <br/>
                <img src="${formData.image}" alt="Car Image" width="225" height="225" style="margin: auto" />
                <br/>
                <strong>Name:</strong> ${formData.name} <br/>
                <strong>Details:</strong> ${formData.details} <br/>
                <strong>Price:</strong> $${formData.price} <br/>
            `, 
            confirmButtonText: "Done!",
            confirmButtonColor: "#475569",
        });
    }
</script>


<style scoped>

.modal-transition-enter-active .inner{
    animation: bounce-in 0.4s ease-in-out;
}

.modal-transition-leave-active {
    transition: all 0.1s ease-in-out;
}

.modal-transition-leave-from {
    opacity: 1;
}

.modal-transition-leave-to {
    opacity: 0;
}

@keyframes bounce-in {
    0% {
        transform: scale(0.6);
    }

    50% {
        transform: scale(1.06);
    }

    90% {
        transform: scale(0.96);
    }

    100% {
        transform: scale(1);
    }
}

</style>

