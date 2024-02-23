<template>
  <main>
    <!-- Use the Modal component -->
    <button @click="showModal = true">Show modal</button>
    <ModalWindow v-model="showModal" @addNote="handleAddItem" />

    <div class="main-background">
      <div class="flex justify-center">

        <div class="w-2/3 mx-auto">
          <div v-for="(item, index) in timelineItems" :key="index">
            <TimelineItem :note=item></TimelineItem>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import {reactive, ref, watchEffect } from 'vue';
import type { Note } from '../types/note';

const showModal = ref(false);

const dateReviver = (key: any, value: any) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    return new Date(value);
  }
  return value;
};

const useLocalStorage = (key: string): Note[] => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue, dateReviver) : [];
};

const timelineItems = reactive<Note[]>(useLocalStorage('timelineItems'));

watchEffect(() => {
   localStorage.setItem('timelineItems', JSON.stringify(timelineItems));
});

const handleAddItem = (newItem: Note) => {
  timelineItems.push(newItem);
};
</script>


<style>
.main-background {

  background-color: #F8FAFC;
}

* Add your custom styles here if needed */ .custom-modal {
  background-color: lightblue;
  /* Add any other custom styles for the modal container */
}

.custom-close-button {
  background-color: red;
  color: white;
  /* Add any other custom styles for the close button */
}
</style>