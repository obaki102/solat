<template>
  <button @click="toggleTheme" class="cursor-pointer p-4 m-5 hover:scale-110">
    <span v-if="isDarkTheme" title="Dark Mode">🌙</span>
    <span v-if="!isDarkTheme" title="Light Mode">☀️</span>
    <label for="checkbox" class="switch-label">
    </label>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isDarkTheme = ref(true);
defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);
const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  document.documentElement.classList.toggle('dark', isDarkTheme.value);
  localStorage.setItem('theme', isDarkTheme.value.toString());
  emits('update:modelValue', isDarkTheme.value);
};

onMounted(() => {
  const storedPreference = localStorage.getItem('theme');
  if (storedPreference) {
    isDarkTheme.value = storedPreference === 'true';
    document.documentElement.classList.toggle('dark', isDarkTheme.value);
    emits('update:modelValue', isDarkTheme.value);
  }
});


</script>

<style scoped></style>
