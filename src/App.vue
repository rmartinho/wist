<template>
  <div class="list">
    <div class="buttons">
      <button @click="onAddCard">
        <add-icon />
      </button>
      <button>
        <filter-icon />
      </button>
    </div>
    <div v-if="newCard">
      <card-list-item v-model="newCard" mode="edit" @save="onNewSave" @remove="onNewRemove" />
    </div>
    <div v-if="filter">
    </div>
    <card-list v-model="cards" mode="edit" @save="onChange" @remove="onChange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { parseJsonFromStorage, writeJsonToStorage } from '@/utils/storage'
import { makeCard, cardIsValid, type Card } from '@/card'
import CardList from '@/components/cards/CardList.vue'
import AddIcon from '@/assets/images/add.svg?component'
import FilterIcon from '@/assets/images/search.svg?component'
import CardListItem from '@/components/cards/CardListItem.vue'

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

function onChange() {
  writeJsonToStorage(window.localStorage, storageKey, cards.value)
}

const newCard = ref(undefined as Card | undefined)

function onAddCard() {
  newCard.value = makeCard()
}

function onNewSave() {
  cards.value.unshift(newCard.value!)
  newCard.value = undefined
}

function onNewRemove() {
  newCard.value = undefined
}

const filter = ref(undefined)
</script>

<style scoped>
.list {
  display: flex;
  gap: 2px;
  flex-flow: column;
}

.buttons {
  margin-left: 4px;
  display: flex;
  flex-flow: row;
}

button {
  width: 24px;
}
</style>
