<template>
  <main>
    <div class="bg-white">
      <div class="flex justify-center">
        <div class="w-2/3 mx-auto">

          <!-- <TimelineItem :isOdd="false" />
          <TimelineItem :isOdd="false" />
          <TimelineItem :isOdd="false" />
          <TimelineItem :isOdd="true" />
          <TimelineItem :isOdd="false" />
          <TimelineItem :isOdd="false" />
          <TimelineItem :isOdd="true" />
          <TimelineItem :isOdd="true" />
          <TimelineItem :isOdd="true" />
          <TimelineItem :isOdd="true" /> -->

          <div v-for="(item, index) in timelineItems" :key="index">
            <TimelineSlot :timelineItem=item ></TimelineSlot>
          </div>


        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TextEditor from '@/components/TextEditor.vue';
import TimelineSlot from '@/components/TimelineSlot.vue';
import { ref } from 'vue';
import type { TimelineItem } from '../types/timelineItem';
const content = ref('');


// Dummy data
const timelineItem1: TimelineItem = {
  isOdd: true,
  date: new Date('2022-02-21'),
  name: 'John Doe',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

const timelineItem2: TimelineItem = {
  isOdd: false,
  date: new Date('2022-02-22'),
  name: 'Jane Doe',
  content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

const timelineItem3: TimelineItem = {
  isOdd: true,
  date: new Date('2022-02-23'),
  name: 'Alice Smith',
  content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};

const timelineItem4: TimelineItem = {
  isOdd: false,
  date: new Date('2022-02-24'),
  name: 'Bob Johnson',
  content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
};
const timelineItems = ref([] as TimelineItem[])
// Constant storing the array of items
 timelineItems.value = [timelineItem1, timelineItem2, timelineItem3, timelineItem4];
</script>


