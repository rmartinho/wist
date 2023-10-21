<template>
    <aspect-icon-group :aspects="aspects" />
    <aspect-icon-group :aspects="aspects" :row-size="2" />
</template>

<script setup lang="ts">
import AspectIconGroup from '@/components/AspectIconGroup.vue'

const aspects = ['lantern', 'forge', 'edge', 'winter']
</script>

<style scoped></style>
