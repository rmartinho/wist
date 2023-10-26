<template>
  <card-list v-model="cards" mode="edit"/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeCard } from '@/card'
import CardList from '@/components/cards/CardList.vue'

const cards = ref([makeCard(), makeCard()])
</script>

<style scoped>
hr {
  margin: 8px;
}
</style>
