<template>
  <main>
    <div class="flex items-center bg-gradient-to-r from-gray-400 via-gray-200 to-gray-300 text-gray-800 h-24 mb-5
    dark:bg-gradient-to-r dark:from-surat-900 dark:via-surat-500 dark:to-surat-900 dark:text-gray-200">
      <h1 class="flex text-3xl font-semibold tracking-tight ml-5 mr-5 custom-font">Surat</h1>
      <div class="flex items-center justify-center flex-grow">
        <div class="flex flex-col max-w-720 md:w-96 lg:w-720 max-lg:w-auto">
          <div
            class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden hover:shadow-md transition duration-300 hover:scale-105">
            <div class="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input v-model="searchTerm" class="peer h-full w-full outline-none text-sm text-gray-700 pr-2" type="text"
              id="search" placeholder="Search notes..." />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end p-2">
        <div>
          <button class="m-5 hover:scale-110" @click="openModal(false)">
            <svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-gray-200" height="30" width="30"
              viewBox="0 0 24 24">
              <title>Add Note</title>
              <path
                d="M19 13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H13.35C13.13 20.37 13 19.7 13 19C13 15.69 15.69 13 19 13M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z" />
            </svg>
          </button>
        </div>
        <div>
          <ThemeToggle v-model="isDarkTheme" />
        </div>
      </div>
    </div>
    <transition enter-active-class="transition-transform duration-500 ease-out"
      enter-from-class="translate-x-full opacity-0" enter-to-class="translate-x-0 opacity-100">
      <ModalWindow :modal="modal" @handleNote="handleNote" @closeModal="closeModal" :key="modal.id" />
    </transition>
    <div>
      <div class="flex flex-col items-center">
        <div v-for="(item, index) in sortedNotes" :key="index" @click="openModal(true, item)">
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
import { reactive, watchEffect, ref, computed } from 'vue';
import type { Note } from '../types/note';
import type { Modal } from '../types/modalType';
import { v4 as uuidv4 } from 'uuid';
import { getEncryptedData, setEncryptedData } from 'obaki-local-storage'
const isDarkTheme = ref(false);
const modal = reactive<Modal>({
  id: '',
  showModal: false,
  isForEdit: false,
  isDarkTheme: isDarkTheme.value,
  note: {} as Note
});

const decryptedData = getEncryptedData<Note>('notes-encrypted', import.meta.env.VITE_ENCRYPTION_KEY);
const notes = reactive<Note[]>(decryptedData ? decryptedData : []);

watchEffect(() => {
  setEncryptedData<Note>('notes-encrypted', notes, import.meta.env.VITE_ENCRYPTION_KEY,)
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
  modal.isForEdit = isForEdit;
  modal.isDarkTheme = isDarkTheme.value;
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
