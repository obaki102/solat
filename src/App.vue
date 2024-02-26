<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAnalytics, logEvent } from "firebase/analytics";
import { v4 as uuidv4 } from 'uuid';


const analytics = getAnalytics();
import { onMounted } from 'vue';

onMounted(() => {
  let userId = localStorage.getItem('userId');

  if (!userId) {
    userId = generateUniqueId();
    localStorage.setItem('userId', userId);
  }

  // Log a page_view event with the unique userId
  logEvent(analytics,'page_view', {
    userId,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
});

function generateUniqueId() {
  return uuidv4(); 
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
