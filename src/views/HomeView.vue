<template>
  <main>
    <div class="fullpage-container bg-gray-600">
      <div class="flex p-12 justify-center">
        <div class="flex p-5 text-sm">
          <TextEditor v-model="content1" />
        </div>
      </div>
      <ul class="list-disc list-inside">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
    </div>



  </main>
</template>

<script setup lang="ts">
import TextEditor from '@/components/TextEditor.vue';
import { ref } from 'vue';
const content1 = ref('<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>')

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

