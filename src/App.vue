<template>
    <aspect-check-group :aspects="aspects" v-model="stuff"/>
</template>

<script setup lang="ts">
import AspectCheckGroup from '@/components/AspectCheckGroup.vue'
import { ref, watchEffect } from 'vue';

const aspects = ['lantern', 'forge', 'edge', 'winter']
const stuff = ref({lantern: true, forge: false, edge: false, winter: false})
watchEffect(() => console.log(stuff.value));
</script>

<style scoped></style>
