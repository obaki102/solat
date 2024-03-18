<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAnalytics, logEvent } from "firebase/analytics"
import { v4 as uuidv4 } from 'uuid';
import { registerSW } from 'virtual:pwa-register'
import { onMounted, ref } from 'vue';


const updateSW = registerSW({
  onNeedRefresh() {
    // trigger a user prompt or just automatically
    updateSW()
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
})

const analytics = getAnalytics();


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
  <div class="bg-white dark:bg-surat-500 min-h-screen pb-2">
    <RouterView />
  </div>
 
</template>

<style scoped></style>
