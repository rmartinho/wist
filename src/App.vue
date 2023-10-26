<template>
  <card-list v-model="cards" mode="edit" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeCard } from '@/card'
import CardList from '@/components/cards/CardList.vue'

const cards = ref([makeCard(), makeCard({ name: 'Phost', aspects: { lantern: 2, sky: 1, soul: 1 } })])
</script>

<style scoped>
hr {
  margin: 8px;
}
</style>
