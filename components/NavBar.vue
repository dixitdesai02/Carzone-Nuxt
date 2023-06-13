<template>
    <header class="bg-slate-600 text-center pt-4 pb-3 sticky top-0 w-full z-40">
        <div class="w-5/6 sm:w-2/3 flex justify-between items-center m-auto">
            <NuxtLink to="/">
                <h1 class="text-2xl sm:text-3xl text-slate-200 font-bold">Car Zone</h1>
                <h3 class="text-md mt-1 text-sky-300 font-semibold">-Driving Dreams</h3>
            </NuxtLink>
            <div class="nav-list bg-slate-600" ref="navList">
                <div class="hamburger-menu" @click="showMenu">
                    <div class="line line-1"></div>
                    <div class="line line-2"></div>
                    <div class="line line-3"></div>
                </div>

                <div class="flex flex-col items-center md:flex-row md:gap-6 font-semibold text-lg text-slate-300">
                    <h3 v-if="isLoggedIn" class="flex items-center gap-2 cursor-pointer text-base bg-slate-500 px-4 py-1 rounded-full"><NuxtImg class="w-5 object-contain" src="images/user.png"/>{{ loggedInUser }}</h3>
                    <NuxtLink to="/" v-if="isLoggedIn" class="hover:text-white hover:underline" @click="handleBtnclick">Home</NuxtLink>
                    <NuxtLink to="/login" v-if="!isLoggedIn" class="hover:text-white hover:underline" @click="handleBtnclick">Login</NuxtLink>
                    <NuxtLink to="/register" v-if="!isLoggedIn" class="hover:text-white hover:underline" @click="handleBtnclick">Register</NuxtLink>
                    <NuxtLink to="/login" v-if="isLoggedIn" @click="handleLogout()" class="hover:text-white hover:underline">Logout</NuxtLink>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isLoggedIn, loggedInUser } = storeToRefs(authStore);

const navList = ref(null);
function showMenu() {
    navList.value.classList.toggle('change');
}

function handleBtnclick() {
    navList.value.classList.toggle('change');
}

function handleLogout() {
    authStore.logout();
    handleBtnclick();
}
</script>

<style scoped>
    .exact-active {
        color: #7DD3FC;
    }

    @media screen and (max-width: 768px) {
        .nav-list {
            width: 225px;
            height: 225px;
            position: fixed;
            top: 0;
            right: -325px;
            display: flex;
            flex-direction: column;
            padding-top: 85px;
            padding-left: 25px;
            align-items: center;
            border-radius: 0 0 0 75%;
            font-size: 1rem;
            transition: right 0.4s cubic-bezier(1, 0, 0, 1);
        }
    
        .change {
            right: 0;
        }
        .hamburger-menu {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 25px;
            right: 50px;
            width: 35px;
            height: 35px;
            justify-content: space-around;
            cursor: pointer;
        }
    
        .line {
            width: 100%;
            height: 3px;
            border-radius: 2px;
            background-color: rgb(199, 199, 199);
            transition: all 0.4s;
        }
    
        .change .line-1 {
            transform: rotateZ(-45deg) translate(-8px, 8px);   
        }
    
        .change .line-2 {
            opacity: 0;
        }
    
        .change .line-3 {
            transform: rotateZ(45deg) translate(-8px, -9px);
        }
    }
</style>