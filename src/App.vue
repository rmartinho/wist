<template>
    <aspect-counter-group :aspects="aspects" v-model="stuff" />
    <dark-mode-toggle title="Switch color scheme">
      <template #light-icon>
        Light
      </template>
      <template #dark-icon>
        Dark
      </template>
    </dark-mode-toggle>
</template>

<script setup lang="ts">
import DarkModeToggle from './components/DarkModeToggle.vue';
import AspectCounterGroup from '@/components/group/AspectCounterGroup.vue'
import { ref, watch } from 'vue';

const aspects = ['lantern', 'forge', 'edge', 'winter']
const stuff = ref({})
watch(stuff, () => console.log(stuff.value), { immediate: true, deep: true });
</script>
