<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
  import { useAuthStore } from './stores/authStore';

  useAuthStore().isLoggedIn = useSessionStorage('token', null).value && useSessionStorage('isLoggedIn', false).value;
  useAuthStore().loggedInUser = useSessionStorage('loggedInUser', null).value;

  useRuntimeConfig();
</script>