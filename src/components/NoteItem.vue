<template>
  <div class="flex px-2 py-2 transition duration-300 hover:scale-105" v-show="note">
    <div class="flex flex-col max-md:w-96 md:w-720 text-gray-700 dark:text-gray-100 bg-white dark:bg-surat-500 border hover:shadow-md bg-clip-border
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
      <div class="flex flex-wrap max-w-screen-md max-h-48 overflow-hidden overflow-ellipsis text-ellipsis text-justify ">
        <span v-html="sanitizedHtml(note.content)"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '../types/note';
import DOMPurify from 'dompurify';

defineProps<{
  note: Note
}>();

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const seconds = timeDifferenceInSeconds % 60;
  const minutes = Math.floor(timeDifferenceInSeconds / 60) % 60;
  const hours = Math.floor(timeDifferenceInSeconds / (60 * 60)) % 24;
  const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));

  if (days > 0) {
    return {
      timeAgo: `${days} ${days === 1 ? 'day' : 'days'} ago`
    };
  } else if (hours > 0) {
    return {
      timeAgo: `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    };
  } else if (minutes > 0) {
    return {
      timeAgo: `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    };
  } else {
    return {
      timeAgo: `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
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
