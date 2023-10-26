<template>
  <button @click="cards.unshift(makeCard())">
    <add-icon />
  </button>
  <card-list v-model="cards" mode="edit" @save="onChange" @remove="onChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { parseJsonFromStorage, writeJsonToStorage } from '@/utils/storage'
import { makeCard, cardIsValid, type Card } from '@/card'
import CardList from '@/components/cards/CardList.vue'
import AddIcon from '@/assets/images/add.svg?component'

const storageKey = 'cards'

function isCardArray(obj: any): obj is Card[] {
  return Array.isArray(obj)
    && obj.every(o => cardIsValid(o))
}

function load(): Card[] {
  const cards = parseJsonFromStorage(window.localStorage, storageKey, isCardArray) ?? []
  return cards.map(makeCard)
}

const cards = ref(load())

function onChange(_card: Card) {
  writeJsonToStorage(window.localStorage, storageKey, cards.value)
}
</script>

<style scoped>
hr {
  margin: 8px;
}

button {
  width: 24px;
}
</style>
