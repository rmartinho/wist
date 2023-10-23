<template>
  <div class="card">
    <div class="card-name">
      <input type="text" v-focus v-model="card.name" placeholder="Card name">
    </div>
    <div class="card-type">
      <type-radio-group v-model="card.aspects" />
    </div>
    <div class="card-principles">
      <principle-counter-group v-model="card.aspects" />
    </div>
  </div>
  {{ card }}
</template>

<script setup lang="ts">
import PrincipleCounterGroup from '@/components/group/PrincipleCounterGroup.vue';
import TypeRadioGroup from './group/TypeRadioGroup.vue';
import { type Card } from '@/card'

const card = defineModel<Card>({ required: true })
</script>

<style scoped>
.card {
  display: inline-grid;
  grid-template: auto / 1fr max-content;
  min-width: 128px;
}

input[type=text] {
  width: 100%;
}

.card-type,
.card-name,
.card-principles,
.card-extras {
  margin: 2px;
}

.card-name {
  grid-row: 1;
}

.card-type {
  grid-row: 2;
}

.card-principles {
  grid-row: 3;
}

.card-extras {
  grid-row: 4;
}
</style>