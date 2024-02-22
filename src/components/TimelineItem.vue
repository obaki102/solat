<template>
  <!-- LEFT-->
  <div class="flex flex-row w-full" v-if="note.isOdd">
    <div class="w-2/5 px-2 py-10">
      <div class="flex flex-col w-full text-gray-700 bg-white shadow-md bg-clip-border rounded-xl px-4 py-5">
        <div class="text-gray-600 mb-2 flex justify-between">
          <div class="font-bold">
            {{ note.name }}
          </div>
          <!-- <div class="flex flex-row">
            <button class="text-blue-500 mr-2 hover:text-blue-300 transition duration-200"><i
                class="far fa-edit"></i></button>
            <button class="text-red-500 hover:text-red-300 transition duration-200"><i
                class="far fa-trash-alt"></i></button>
          </div> -->
        </div>
        <div class="text-gray-600">
          <span v-html="sanitizedHtml(note.content)"></span>
        </div>
      </div>
    </div>
    <div class="w-1/5  flex justify-center">
      <div class="relative flex h-full w-1 bg-blue-300 items-center justify-center">
        <div
          class="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-blue-300 leading-none text-center z-10 bg-white font-thin ">
          <div>{{ formatDate(note.date).day }}</div>
          <div>{{ formatDate(note.date).month }}</div>
          <div>{{ formatDate(note.date).time }}</div>
        </div>
      </div>
    </div>
    <div class="w-2/5 px-2 py-10 ">
    </div>
  </div>

  <!-- RIGHT-->
  <div class="flex flex-row w-full" v-if="!note.isOdd">
    <div class="w-2/5 px-2 py-10">
    </div>
    <div class="w-1/5  flex justify-center">
      <div class="relative flex h-full w-1 bg-blue-300 items-center justify-center">
        <div
          class="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-blue-300 leading-none text-center z-10 bg-white font-thin">
          <div>{{ formatDate(note.date).day }}</div>
          <div>{{ formatDate(note.date).month }}</div>
          <div>{{ formatDate(note.date).time }}</div>
        </div>
      </div>
    </div>
    <div class="w-2/5 px-2 py-10 ">
      <div class="flex flex-col w-full text-gray-700 bg-white shadow-md bg-clip-border rounded-xl px-4 py-5">
        <div class="text-gray-600 mb-2 flex justify-between">
          <div class="font-bold">
            {{ note.name }}
          </div>
        </div>
        <div class="text-gray-600">
          <span v-html="sanitizedHtml(note.content)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Note } from '../types/note';
import DOMPurify from 'dompurify';

defineProps<{
  note: Note;
}>();

const formatDate = (date: Date) => {
  const day = date.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthIndex = date.getMonth();
  const month = monthNames[monthIndex];

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; 

  return {
    day,
    month,
    time: `${formattedHours}:${minutes}:${seconds} ${amOrPm}`
  };
};

const sanitizedHtml = (html: string) => {
  return DOMPurify.sanitize(html);
};


</script>

<style>
/* Add your styling here */
</style>
../types/note