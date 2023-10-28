<template>
  <div class="list">
    <div v-if="!newCard && !filter" class="buttons">
      <button @click="onAddCard">
        <add-icon />
      </button>
      <button @click="onFilter">
        <filter-icon />
      </button>
    </div>
    <div v-if="newCard">
      <card-list-item v-model="newCard" mode="edit" @save="onNewSave" @remove="onNewRemove" />
    </div>
    <div v-if="filter">
      <filter-selector v-model="filter" @reset="onResetFilter" />
    </div>
    <card-list v-model="filteredCards" @save="onChange" @remove="onChange" :mode="filter? 'view' : 'edit'" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { parseJsonFromStorage, writeJsonToStorage } from '@/utils/storage'
import { makeCard, cardIsValid, type Card } from '@/card'
import { makeSlot, matchesSlot, type Slot } from '@/slot'
import CardList from '@/components/cards/CardList.vue'
import CardListItem from '@/components/cards/CardListItem.vue'
import FilterSelector from '@/components/filters/FilterSelector.vue'
import AddIcon from '@/assets/images/add.svg?component'
import FilterIcon from '@/assets/images/filter.svg?component'

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

const filter = ref(undefined as Slot | undefined)

function onFilter() {
  filter.value = makeSlot()
}

function onResetFilter() {
  filter.value = undefined
}

const filteredCards = computed(() => {
  const slot = filter.value
  if (slot) {
    return cards.value.filter(c => matchesSlot(c.aspects, slot))
  } else {
    return cards.value
  }
})
</script>

<style scoped>
.list {
  display: flex;
  gap: 2px;
  flex-flow: column;
}

.buttons {
  padding-left: 4px;
  display: flex;
  flex-flow: row;
}

button {
  width: 24px;
}
</style>
