<template>
  <main>
    <!-- Use the Modal component -->
    <button @click="showModal = true">Add Note</button>
    <ModalWindow v-model="showModal" @addNote="handleAddItem" />

    <div class="main-background">
      <div class="flex flex-col items-center">
        <div  v-for="(item, index) in timelineItems.slice().sort((a, b) => b.date.getTime() - a.date.getTime())"
          :key="index">
          <NoteItem :note=item></NoteItem>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import NoteItem from '@/components/NoteItem.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { reactive, ref, watchEffect } from 'vue';
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
  background-color: #e0e0e0;
  min-height: 100vh;

}

* Add your custom styles here if needed */ .custom-modal {
  background-color: lightblue;

}

.custom-close-button {
  background-color: red;
  color: white;
  /* Add any other custom styles for the close button */
}
</style>