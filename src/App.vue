<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getAnalytics, logEvent } from "firebase/analytics"
import { v4 as uuidv4 } from 'uuid';
import { onMounted, ref } from 'vue';

// import { registerSW } from 'virtual:pwa-register'
// const updateSW = registerSW({
//   onNeedRefresh() {
//     // trigger a user prompt or just automatically
//     updateSW()
//   },
//   onOfflineReady() {
//     // show a ready to work offline to user
//   },
// })
const isMobile = ref(false);
const message = ref('');
onMounted(() => {
  if (/Mobi|Android/i.test(window.navigator.userAgent)) {
    isMobile.value = true;
    message.value = 'The mobile version is still under construction. Please use the web version.';
  }
});


const analytics = getAnalytics();

onMounted(() => {
  let userId = localStorage.getItem('userId');

  if (!userId) {
    userId = generateUniqueId();
    localStorage.setItem('userId', userId);
  }

  // Log a page_view event with the unique userId
  logEvent(analytics, 'page_view', {
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
  <div v-if="isMobile" class="alert">
    {{ message }}
  </div>
  <div v-else class="bg-white dark:bg-surat-500 min-h-screen pb-2">
    <RouterView />
  </div>

</template>

<style scoped></style>
