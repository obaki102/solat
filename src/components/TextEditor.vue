<template>
  <div>
    <div class="flex flex-col max-w-container bg-white dark:bg-slate-800  bg-clip-border rounded-xl p-4">
      <div v-if="editor"
        class="max-t-container dark:bg-slate-800 dark:bg-black-lighter buttons flex flex-wrap items-center gap-x-4 bg-white border border-slate-200 rounded-xl p-4 mb-2">
        <button @click="editor.chain().undo().run()" :disabled="!editor.can().chain().undo().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>undo</title>
            <path
              d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z" />
          </svg>
        </button>
        <button @click="editor.chain().redo().run()" :disabled="!editor.can().chain().redo().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>redo</title>
            <path
              d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z" />
          </svg>
        </button>
        <div class="h-6 border-l border-solid border-gray-800"></div>


        <button @click="editor.chain().toggleBold().run()" :disabled="!editor.can().chain().toggleBold().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded dark:fill-gray-900': editor.isActive('bold') }">
          <svg xmlns="http://www.w3.org/2000/svg" class="dark:fill-gray-200"
            :class="{ 'dark:fill-gray-700': editor.isActive('bold') }" width="20" height="20" viewBox="0 0 24 24">
            <title>bold</title>
            <path
              d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleItalic().run()" :disabled="!editor.can().chain().toggleItalic().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg" :class="{ 'bg-gray-300 rounded': editor.isActive('italic') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>italic</title>
            <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleStrike().run()" :disabled="!editor.can().chain().toggleStrike().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg" :class="{ 'bg-gray-300 rounded': editor.isActive('strike') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>strike</title>
            <path
              d="M7.2 9.8C6 7.5 7.7 4.8 10.1 4.3C13.2 3.3 17.7 4.7 17.6 8.5H14.6C14.6 8.2 14.5 7.9 14.5 7.7C14.3 7.1 13.9 6.8 13.3 6.6C12.5 6.3 11.2 6.4 10.5 6.9C9 8.2 10.4 9.5 12 10H7.4C7.3 9.9 7.3 9.8 7.2 9.8M21 13V11H3V13H12.6C12.8 13.1 13 13.1 13.2 13.2C13.8 13.5 14.3 13.7 14.5 14.3C14.6 14.7 14.7 15.2 14.5 15.6C14.3 16.1 13.9 16.3 13.4 16.5C11.6 17 9.4 16.3 9.5 14.1H6.5C6.4 16.7 8.6 18.5 11 18.8C14.8 19.6 19.3 17.2 17.3 12.9L21 13Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleCode().run()" :disabled="!editor.can().chain().toggleCode().run()"
          class="flex hover:bg-gray-300 p-1 rounded-lg" :class="{ 'bg-gray-300 rounded': editor.isActive('code') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>code</title>
            <path
              d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleHeading({ level: 1 }).run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded': editor.isActive('heading', { level: 1 }) }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>H1</title>
            <path d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleHeading({ level: 2 }).run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded': editor.isActive('heading', { level: 2 }) }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>H2</title>
            <path
              d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleHeading({ level: 3 }).run()"
          :class="{ 'bg-gray-300 rounded': editor.isActive('heading', { level: 3 }) }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>H3</title>
            <path
              d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M15,4H19A2,2 0 0,1 21,6V16A2,2 0 0,1 19,18H15A2,2 0 0,1 13,16V15H15V16H19V12H15V10H19V6H15V7H13V6A2,2 0 0,1 15,4Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleBulletList().run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'list-disc list-inside': editor.isActive('bulletList') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>bullet-list</title>
            <path d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9" />
          </svg>
        </button>
        <button @click="editor.chain().toggleOrderedList().run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded': editor.isActive('orderedList') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>order-list</title>
            <path
              d="M7 21H3V19H7V18H5C3.9 18 3 17.11 3 16V15C3 13.9 3.9 13 5 13H7C8.11 13 9 13.9 9 15V19C9 20.11 8.11 21 7 21M7 15H5V16H7M5 3H7C8.11 3 9 3.9 9 5V9C9 10.11 8.11 11 7 11H5C3.9 11 3 10.11 3 9V5C3 3.9 3.9 3 5 3M5 9H7V5H5M12 5H22V7H12M12 19V17H22V19M12 11H22V13H12Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleCodeBlock().run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded': editor.isActive('codeBlock') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>code-block</title>
            <path
              d="M5 3C3.9 3 3 3.9 3 5S2.1 7 1 7V9C2.1 9 3 9.9 3 11S3.9 13 5 13H7V11H5V10C5 8.9 4.1 8 3 8C4.1 8 5 7.1 5 6V5H7V3M11 3C12.1 3 13 3.9 13 5S13.9 7 15 7V9C13.9 9 13 9.9 13 11S12.1 13 11 13H9V11H11V10C11 8.9 11.9 8 13 8C11.9 8 11 7.1 11 6V5H9V3H11M22 6V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V15H4V18H20V6H17.03V4H20C21.11 4 22 4.89 22 6Z" />
          </svg>
        </button>
        <button @click="editor.chain().toggleBlockquote().run()" class="flex hover:bg-gray-300 p-1 rounded-lg"
          :class="{ 'bg-gray-300 rounded': editor.isActive('blockquote') }">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>block-quote</title>
            <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
          </svg>
        </button>
        <button @click="editor.chain().setHorizontalRule().run()" class="flex hover:bg-gray-300 p-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title> horizontal rule</title>
            <path d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />
          </svg>
        </button>
        <button @click="editor.chain().setHardBreak().run()" class="flex hover:bg-gray-300 p-1 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <title>hard break</title>
            <path
              d="M18,20H6V18H4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V18H18V20M14,2H6A2,2 0 0,0 4,4V12H6V4H14V8H18V12H20V8L14,2M11,16H8V14H11V16M16,16H13V14H16V16M3,14H6V16H3V14M21,16H18V14H21V16Z" />
          </svg>
        </button>
      </div>
      <div class="max-w-container dark:bg-slate-800 border border-slate-200 rounded-xl p-2">
        <EditorContent :editor="editor" class="bg-gray-100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography'
import { Editor, EditorContent } from '@tiptap/vue-3';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);
const modelValue = ref<string>(props.modelValue);
const editor = ref<Editor>();

const onUpdate = () => {
  emits('update:modelValue', editor.value?.getHTML());
};

watch(modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value;

  if (!isSame) {
    editor.value?.commands.setContent(value, false);
  }
});

editor.value = new Editor({
  editorProps: {
    attributes: {
      class: 'prose max-w-none '
    },
    // handleKeyDown: (view, event) => {
    //   if (event.shiftKey && event.key === 'Enter') {
    //     console.log('Shift Enter');
    //     return true;
    //   }

    //   if (event.key === 'Enter') {
    //     console.log('Enter');
    //     editor.value?.commands.setHardBreak();
    //     return true;
    //   }
    // }
  },
  extensions: [StarterKit, Typography],
  content: modelValue.value,
  onUpdate,
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

</script>

<style lang="scss">
.tiptap {
  max-width: 810px;
  margin: 0 auto;
  min-height: 370px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: #333;
  background-color: #FFF;
  font-size: 0.875rem;
  max-height: 800px;
  /* You can adjust this value as needed */
  overflow-y: auto;


  pre {
    background: #0D0D0D;
    color: #FFF;

    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
      margin: 1;
    }
  }
}

.max-w-container {
  max-width: 830px;
  min-height: 370px;
  height: 100%;
}

.max-t-container {
  max-width: 830px;
}
</style>

