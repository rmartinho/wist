<template>
  <aspect-radio aspect="lantern" name="test" v-model="model" />
  <aspect-radio aspect="forge" name="test" v-model="model" />
  <aspect-radio aspect="edge" name="test" v-model="model" readonly checked />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AspectRadio from '@/components/AspectRadio.vue'

const model = ref({ name: 'test' })
</script>

<style scoped></style>
