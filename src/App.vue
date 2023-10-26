<template>
  <button @click="cards.unshift(makeCard())">
    <add-icon />
  </button>
  <card-list v-model="cards" mode="edit" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { makeCard, type Card } from '@/card'
import CardList from '@/components/cards/CardList.vue'
import AddIcon from '@/assets/images/add.svg?component'

const cards = ref([] as Card[])
</script>

<style scoped>
hr {
  margin: 8px;
}
button {
  width: 24px;
}
</style>
