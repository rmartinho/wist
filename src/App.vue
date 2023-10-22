<template>
    <aspect-counter-group :aspects="aspects" v-model="stuff" />
</template>

<script setup lang="ts">
import AspectCounterGroup from '@/components/AspectCounterGroup.vue'
import { ref, watch } from 'vue';

const aspects = ['lantern', 'forge', 'edge', 'winter']
const stuff = ref({})
watch(stuff, () => console.log(stuff.value), { immediate: true, deep: true });
</script>
