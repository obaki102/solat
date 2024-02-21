<template>
  <div @click="toggleTheme" class="cursor-pointer p-4">
    Toggle Theme
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkTheme = ref(false);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  document.documentElement.classList.toggle('dark', isDarkTheme.value);
  localStorage.setItem('theme', isDarkTheme.value.toString());
};

onMounted(() => {
  const storedPreference = localStorage.getItem('theme');
  if (storedPreference) {
    isDarkTheme.value = storedPreference === 'true';
    document.documentElement.classList.toggle('dark', isDarkTheme.value);
  }
});
</script>

<style scoped>
</style>
