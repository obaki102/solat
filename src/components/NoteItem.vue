<template>
 
    <div class="flex px-2 py-1 transition duration-300 hover:scale-105" v-show="note">
      <div class="flex flex-col fixed-width text-gray-700 dark:text-gray-105 bg-white  dark:bg-slate-900 border hover:border-2 hover:shadow-sm bg-clip-border
        dark:border-slate-200 rounded-xl px-4 py-5">
        <div class="flex  mb-2 flex justify-between">
          <div class="font-bold">
            {{ formatTimeAgo(note.date).timeAgo }}
          </div>
          <!-- <div class="flex flex-row">
            <button class="text-blue-500 mr-2 hover:text-blue-300 transition duration-200"><i
                class="far fa-edit"></i></button>
            <button class="text-red-500 hover:text-red-300 transition duration-200"><i
                class="far fa-trash-alt"></i></button>
          </div> -->
        </div>
        <div
          class="flex flex-wrap max-w-screen-md max-h-48 overflow-hidden overflow-ellipsis text-ellipsis text-justify ">
          <span v-html="sanitizedHtml(note.content)"></span>
        </div>
      </div>
    </div>
    

</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Note } from '../types/note';
import DOMPurify from 'dompurify';

defineProps<{
  note: Note
}>();

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const timeDifference = now.getTime() - date.getTime();
  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return {
      timeAgo: `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    };
  } else if (hours < 24) {
    return {
      timeAgo: `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    };
  } else {
    return {
      timeAgo: `${days} ${days === 1 ? 'day' : 'days'} ago`
    };
  }
};

const sanitizedHtml = (html: string) => {
  return DOMPurify.sanitize(html);
};


</script>

<style>
.fixed-width {
  width: 720px;
}

</style>
