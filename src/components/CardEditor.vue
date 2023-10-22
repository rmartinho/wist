<template>
  <div class="card">
    <div class="card-name">
      <input v-focus v-model="card.name" placeholder="Card name">
    </div>
    <div class="card-principles">
      <principle-counter-group v-model="card.aspects" />
    </div>
  </div>
  {{ card }}
</template>

<script setup lang="ts">
import PrincipleCounterGroup from '@/components/group/PrincipleCounterGroup.vue';
import { type Card } from '@/card'

const card = defineModel<Card>({ required: true })
</script>