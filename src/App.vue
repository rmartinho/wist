<template>
  <card-list-item v-model="card" />
  <hr />
  <card-list-item v-model="card" mode="view" />
  <hr />
  <card-list-item v-model="card" mode="select" />
  <card-list-item v-model="card" mode="select" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeCard } from '@/card'
import CardListItem from '@/components/cards/CardListItem.vue'

const card = ref(makeCard(''))
</script>

<style scoped>
hr {
  margin: 8px;
}
</style>
