<template>
  <!-- LEFT-->
  <div class="flex flex-row w-full" v-if="isOdd">
    <div class="w-2/5 px-2 py-10">
      <div class="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
        <div class="text-gray-600 mb-2 flex justify-between">
          <div class="font-bold">
            Svjatoslav Torn
          </div>
          <div class="flex flex-row">
            <button class="text-blue-500 mr-2 hover:text-blue-300 transition duration-200"><i
                class="far fa-edit"></i></button>
            <button class="text-red-500 hover:text-red-300 transition duration-200"><i
                class="far fa-trash-alt"></i></button>
          </div>
        </div>
        <div class="text-gray-600">
          Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa deserunt, dignissimos
          dolor esse fugit ipsam minus odit officiis placeat qui, quidem quis soluta vero? Adipisci alias eius et
          iure nam nihil reiciendis saepe, voluptatem. Alias cumque dicta dignissimos ea et laborum, minima
          similique.
        </div>
      </div>

    </div>
    <!--line column-->
    <div class="w-1/5  flex justify-center">
      <div class="relative flex h-full w-1 bg-green-300 items-center justify-center">
        <div
          class="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-green-300 leading-none text-center z-10 bg-white font-thin">
          <div>20</div>
          <div>September</div>
        </div>
      </div>
    </div>
    <!--right column-->
    <div class="w-2/5 px-2 py-10 ">
    </div>
  </div>

  <!-- RIGHT-->
  <div class="flex flex-row w-full" v-if="!isOdd">
    <!-- left col -->
    <div class="w-2/5 px-2 py-10">
    </div>
    <!--line column-->
    <div class="w-1/5  flex justify-center">
      <div class="relative flex h-full w-1 bg-green-300 items-center justify-center">
        <div
          class="absolute flex flex-col justify-center h-24 w-24 rounded-full border-2 border-green-300 leading-none text-center z-10 bg-white font-thin">
          <div>20</div>
          <div>сентября</div>
        </div>
      </div>
    </div>
    <!--right column-->
    <div class="w-2/5 px-2 py-10 ">
      <div class="flex flex-col w-full rounded-lg shadow bg-white px-4 py-5">
        <div class="text-gray-600 mb-2 flex justify-between">
          <div class="font-bold">
            Svetlana Torn
          </div>
        </div>
        <div class="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis enim esse fuga modi quisquam
          veritatis?
          Привет Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad corporis culpa deserunt, dignissimos
          dolor esse fugit ipsam minus odit officiis placeat qui, quidem quis soluta vero? Adipisci alias eius et
          iure nam nihil reiciendis saepe, voluptatem. Alias cumque dicta dignissimos ea et laborum, minima
          similique.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, } from 'vue';

const props = defineProps(['isOdd']);
const isOdd = ref<boolean>(props.isOdd);
</script>

<style>
/* Add your styling here */
</style>
