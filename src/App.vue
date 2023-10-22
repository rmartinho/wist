<template>
    <aspect-radio-group :aspects="aspects" v-model="stuff"/>
</template>

<script setup lang="ts">
import AspectRadioGroup from '@/components/AspectRadioGroup.vue'
import { ref, watchEffect } from 'vue';

const aspects = ['lantern', 'forge', 'edge', 'winter']
const stuff = ref('lantern')
watchEffect(() => console.log(stuff.value));
</script>

<style scoped></style>
