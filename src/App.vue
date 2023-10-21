<template>
  <aspect-counter aspect="lantern" />
  <aspect-counter aspect="forge" :model-value="3" readonly />
</template>

<script setup lang="ts">
import AspectCounter from '@/components/AspectCounter.vue'
</script>

<style scoped></style>
