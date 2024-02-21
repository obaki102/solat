<template>
  <main>
    <div class="fullpage-container bg-gray-100">
      <div class="flex p-12 justify-center">
        <div class="flex p-5 text-sm">
          <TextEditor v-model="content" />
        </div>
      </div>
    </div>



  </main>
</template>

<script setup lang="ts">
import TextEditor from '@/components/TextEditor.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { ref } from 'vue';
const content = ref('')

</script>
<style>
.fullpage-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-direction: column;
}
</style>

