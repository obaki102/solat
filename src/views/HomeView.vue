<template>
  <main>
    <!-- Use the Modal component -->
    <button @click="showModal = true">Add Note</button>
    <transition enter-active-class="transition duration-1000" enter-from-class="opacity-0"
      enter-to-class="opacity-100 bounceIn-effect ">
      <ModalWindow v-model="showModal" @addNote="handleAddItem" />
    </transition>

    <div class="bg-white dark:bg-slate-950">
      <div class="flex flex-col items-center">
        <div class="card-wrapper"
          v-for="(item, index) in timelineItems.slice().sort((a, b) => b.date.getTime() - a.date.getTime())" :key="index">
          <NoteItem :note=item></NoteItem>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue';
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

  .bounceIn-effect {
    animation: bounceIn 1s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  }

  @keyframes bounceIn {

    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }

    40% {
      transform: translateY(-40px);
    }

    60% {
      transform: translateY(-20px);
    }
  }

}</style>