<template>
  <button @click="toggleTheme" class="cursor-pointer p-4">
    <span v-if="isDarkTheme">🌙</span>
    <span v-if="!isDarkTheme">☀️</span>
    <label for="checkbox" class="switch-label">
    </label>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkTheme = ref(true);

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

<style scoped></style>
