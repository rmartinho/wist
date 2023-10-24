<template>
  <card-view v-model="card" />
  <hr />
  <card-view v-model="card" readonly />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeCard } from '@/card'
import CardView from '@/components/CardView.vue'

const card = ref(makeCard(''))
</script>

<style scoped>
hr {
  margin: 8px;
}
</style>
