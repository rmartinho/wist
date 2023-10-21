<template>
    <aspect-button-group :aspects="aspects" @click="a => console.log('a', a)"/>
    <aspect-button-group :aspects="aspects" :row-size="2" @click="a => console.log('b', a)"/>
</template>

<script setup lang="ts">
import AspectButtonGroup from '@/components/AspectButtonGroup.vue'

const aspects = ['lantern', 'forge', 'edge', 'winter']
</script>

<style scoped></style>
