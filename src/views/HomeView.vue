<template>
  <main>
    <div class="fullpage-container bg-white  justify-center">
      <TextEditor v-model="content" />
    </div>
    
  </main>
</template>

<script setup lang="ts">
import TextEditor from '@/components/TextEditor.vue';
import { ref } from 'vue';
const content = ref('')
</script>
<style>
.fullpage-container {
  height: 100vh;
}
</style>

