<template>
  <div class="card">
    <input type="text" v-focus v-model="card.name" placeholder="Card name">
    <type-radio-group v-model="card.aspects" />
    <principle-counter-group v-model="card.aspects" />
  </div>
  {{ card }}
</template>

<script setup lang="ts">
import { type Card } from '@/card'
import PrincipleCounterGroup from '@/components/group/PrincipleCounterGroup.vue'
import TypeRadioGroup from './group/TypeRadioGroup.vue'

const card = defineModel<Card>({ required: true })
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: min-content;
  gap: 4px;
}

input[type=text] {
  width: 100%;
}
</style>