<template>
  <main>
    <!-- Use the Modal component -->
    <button class="m-5 hover:scale-110" @click="openModal(false)"><svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 24 24">
        <title>Add Note</title>
        <path
          d="M19 13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H13.35C13.13 20.37 13 19.7 13 19C13 15.69 15.69 13 19 13M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
      </svg></button>
    <transition enter-active-class="transition duration-500" enter-from-class="opacity-0"
      enter-to-class="opacity-100 animate-fade-in-smoke">
      <ModalWindow :modal="modal" @addNote="handleAddNote" @editNote="handleEditNote" @closeModal="closeModal"
        :key="modal.id" />
    </transition>

    <div class="bg-white dark:bg-slate-950">
      <div class="flex flex-col items-center">
        <div v-for="(item, index) in timelineItems.slice().sort((a, b) => b.date.getTime() - a.date.getTime())"
          :key="index" @click="openModal(true, item)">
          <NoteItem :note=item></NoteItem>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
// import ThemeToggle from '@/components/ThemeToggle.vue';
import NoteItem from '@/components/NoteItem.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { reactive, watchEffect } from 'vue';
import type { Note } from '../types/note';
import type { Modal } from '../types/modalType';
import { v4 as uuidv4 } from 'uuid';

const modal = reactive<Modal>({
  id: '',
  showModal: false,
  IsforEdit: false,
  note: {} as Note
});

const dateReviver = (key: any, value: any) => {
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
    return new Date(value);
  }
  return value;
};

const useLocalStorage = (key: string): Note[] => JSON.parse(localStorage.getItem(key) || '[]', dateReviver);

const timelineItems = reactive<Note[]>(useLocalStorage('timelineItems'));

watchEffect(() => {
  localStorage.setItem('timelineItems', JSON.stringify(timelineItems));
});

const handleAddNote = (newItem: Note) => {
  timelineItems.push(newItem);
}

const handleEditNote = (editedItem: Note) => {
  const index = timelineItems.findIndex(item => item.id === editedItem.id);
  if (index !== -1) {
    timelineItems[index] = editedItem;
  }
}

const openModal = (isForEdit: boolean, noteForEdit?: Note) => {
  const uniqueId = uuidv4();
  modal.note = isForEdit ? noteForEdit || {} as Note : {} as Note;
  modal.IsforEdit = isForEdit;
  modal.showModal = true;
  modal.id = uniqueId;
};

const closeModal = (modalVal: Modal) => modal.showModal = modalVal.showModal;
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

  .animate-fade-in-smoke {
    animation: fade-in-smoke 1s ease-out forwards;
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
      transform: translateY(-20px);
    }

    60% {
      transform: translateY(-10px);
    }
  }

}</style>