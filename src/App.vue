<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';

const isDarkTheme = ref(true);
onMounted(() => {
  const storedPreference = localStorage.getItem('theme');
  if (storedPreference) {
    isDarkTheme.value = storedPreference === 'true';
    document.documentElement.classList.toggle('dark', isDarkTheme.value);
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
