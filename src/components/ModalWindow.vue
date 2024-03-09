<template>
  <div v-if="modal.showModal" class="modal-overlay">
    <!-- Modal -->
    <transition enter-active-class="transition-all duration-500 ease-out" enter-from-class="scale-75 opacity-0"
      enter-to-class="scale-100 opacity-100">
      <div v-show="modal.showModal"
        class="w-11/12 lg:w-full max-w-3xl max-md:max-h-56 z-20 mx-auto bg-white dark:bg-surat-300  flex flex-col relative self-center shadow-2xl dark:shadow-sm rounded-md ">

        <!-- Modal body -->
        <component v-model="noteContent" :is="modal.isDarkTheme ? TextEditorDark : TextEditorLight"/>
        <!-- ./Modal body -->

        <!-- Modal footer -->
        <div class="w-auto border-b border-solid border-slate-100 mx-4"></div>
        <div class="p-3 flex justify-end">
          <button @click="closeModal"
            class="bg-blue-400 hover:bg-blue-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">Close
          </button>
          <button @click="deleteNote" v-if="modal.isForEdit"
            class="bg-red-400 hover:bg-red-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Delete Note</button>
          <button @click="addNote" v-if="!modal.isForEdit"
            class="bg-green-400 hover:bg-green-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Add Note</button>
          <button @click="editNote" v-if="modal.isForEdit"
            class="bg-green-400 hover:bg-green-500 dark:bg-surat-500 dark:hover:bg-surat-900 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mr-2">
            Save Note</button>
        </div>
        <!-- ./Modal footer -->
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import TextEditorLight from '@/components/TextEditorLight.vue';
import TextEditorDark from '@/components/TextEditorDark.vue';
import type { Note } from '../types/note';
import type { Modal } from '../types/modalType';
import { v4 as uuidv4 } from 'uuid';

const { modal } = defineProps<{ modal: Modal }>();
const modalVal = reactive<Modal>(modal);
const noteContent = ref<string>(modal.note.content);


const emit = defineEmits(['closeModal', 'handleNote']);
const addNote = () => {
  const uniqueId = uuidv4();
  const newNote: Note = {
    id: uniqueId,
    date: new Date(),
    name: '',
    content: noteContent.value as string,
  };

  emit('handleNote', newNote, 'add');
  closeModal();

}

const editNote = () => {
  modalVal.note.date = new Date();
  modalVal.note.content = noteContent.value;
  emit('handleNote', modalVal.note, 'edit');
  closeModal();
}

const deleteNote = () => {
  emit('handleNote', modalVal.note, 'delete');
  closeModal();
}

const closeModal = () => {
  modalVal.showModal = false;
  emit('closeModal', modalVal);
  noteContent.value = '';
};

</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow-y: auto;
}
</style>
