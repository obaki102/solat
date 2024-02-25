<template>
  <div v-if="props.modelValue" class="modal-overlay">
    <div class="flex items-center justify-center absolute h-screen top-0 left-0"></div>
         <!-- Modal -->
      <div v-if="props.modelValue"
        class="w-11/12 lg:w-full max-w-3xl z-20 mx-auto bg-white flex flex-col relative self-center shadow-2xl rounded-md ">

        <!-- Modal body -->
        <TextEditor v-model="noteContent" />
        <!-- ./Modal body -->

        <!-- Modal footer -->
        <div class="p-6 flex justify-end">
          <button @click="closeModal"
            class="bg-green-400 hover:bg-green-500 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out">Close
            Modal</button>

          <button @click="addNote"
            class="bg-blue-400 hover:bg-blue-500 focus:outline-none transition px-4 py-2 rounded-md text-white transition duration-500 ease-in-out mx-2">
            Add Note</button>
        </div>
        <!-- ./Modal footer -->
      </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import TextEditor from '@/components/TextEditor.vue';
import type { Note } from '../types/note';
import { v4 as uuidv4 } from 'uuid';

const noteContent = ref<string>();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue', 'addNote']);
const addNote = () => {
  const uniqueId = uuidv4();
  const newNote: Note = {
    id:uniqueId,
    date: new Date(),
    name: '',
    content: noteContent.value as string,
  };
  emit('addNote', newNote);
  closeModal;
}
const closeModal = () => {
  emit('update:modelValue', false);
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  overflow-y: auto;
}
</style>
