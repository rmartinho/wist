<template>
  <aspect-check aspect="lantern" />
  <aspect-check aspect="forge" v-model="selected" checked />
  <aspect-check aspect="edge" :model-value="true" readonly />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AspectCheck from '@/components/AspectCheck.vue'

const selected = ref(false)
</script>

<style scoped></style>
