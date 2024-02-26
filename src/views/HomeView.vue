<template>
  <main>
    <div class="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 text-gray-800 py-6 text-center">
      <h1 class="text-3xl font-semibold tracking-tight">Surat</h1>
      <p class="mt-2 text-sm">If you can think it, you can 'surat' it.</p>
    </div>
    <div class="flex flex-row items-center justify-center p-2">
      <div>
        <div class="flex flex-col max-w-720 md:w-720 max-md:w-96 m-h-screen">
          <div
            class="bg-white items-center justify-between w-full flex rounded-full shadow-lg p-2 mb-5 sticky hover:border-2"
            style="top: 5px">
            <input v-model="searchTerm"
              class="font-bold  rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
              type="text" placeholder="Search notes...">
          </div>
        </div>
      </div>
    </div>

    <div class="fixed top-0 right-0 p-5 transform translate-y-0">
      <button class="m-5 hover:scale-110" @click="openModal(false)">
        <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 24 24">
          <title>Add Note</title>
          <path
            d="M19 13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H13.35C13.13 20.37 13 19.7 13 19C13 15.69 15.69 13 19 13M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
        </svg>
      </button>
    </div>

    <transition enter-active-class="transition-transform duration-500 ease-out" enter-from-class="scale-0 opacity-0"
      enter-to-class="scale-100 opacity-100">
      <ModalWindow :modal="modal" @handleNote="handleNote" @closeModal="closeModal" :key="modal.id" />
    </transition>

    <div class="bg-white dark:bg-slate-950">
      <div class="flex flex-col items-center">
        <div v-for="(item, index) in sortedNotes" :key="index" @click="openModal(true, item)">
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
import { reactive, watchEffect, ref, computed } from 'vue';
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

const notes = reactive<Note[]>(useLocalStorage('notes'));

watchEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
});

const handleNote = (note: Note, operation: string) => {
  const index = notes.findIndex(item => item.id === note.id);
  if (index !== -1) {
    if (operation === 'edit') {
      notes[index] = note;
    } else if (operation === 'delete') {
      notes.splice(index, 1);
    }
  } else if (operation === 'add') {
    notes.push(note);
  }
};

const openModal = (isForEdit: boolean, noteForEdit?: Note) => {
  const uniqueId = uuidv4();
  modal.note = isForEdit ? noteForEdit || {} as Note : {} as Note;
  modal.IsforEdit = isForEdit;
  modal.showModal = true;
  modal.id = uniqueId;
};

const closeModal = (modalVal: Modal) => modal.showModal = modalVal.showModal;


const searchTerm = ref<string>('');

const filteredNotes = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return term
    ? notes.filter((note: Note) => note.content.toLowerCase().includes(term))
    : notes;
});

const sortedNotes = computed(() => {
  return filteredNotes.value.slice().sort((a, b) => b.date.getTime() - a.date.getTime());
});
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



}
</style>