<template>
    <aspect-icon-group :aspects="aspects" @click="a => console.log('a', a)"/>
    <aspect-icon-group :aspects="aspects" :row-size="2" @click="a => console.log('b', a)"/>
</template>

<script setup lang="ts">
import AspectIconGroup from '@/components/AspectIconGroup.vue'

const aspects = ['lantern', 'forge', 'edge', 'winter']
</script>

<style scoped></style>
