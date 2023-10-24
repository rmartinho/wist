<!--
  A component that displays and allows editing a card

  Usage:
    import CardView from 'CardView.vue'

    <card-view v-model="card" />
    <card-view v-model="card" readonly />
-->

<template>
  <div class="card">
    <template v-if="readonly">
      <span class="name">{{ card.name ? card.name : '<missing name>' }}</span>
      <type-icon :aspects="card.aspects" />
      <principle-counter-group v-model="card.aspects" readonly />
    </template>
    <template v-else>
      <input type="text" v-focus v-model="card.name" placeholder="Card name">
      <type-radio-group v-model="card.aspects" />
      <principle-counter-group v-model="card.aspects" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { type Card } from '@/card'
import PrincipleCounterGroup from '@/components/group/PrincipleCounterGroup.vue'
import TypeRadioGroup from '@/components/group/TypeRadioGroup.vue'
import TypeIcon from '@/components/core/TypeIcon.vue'

const card = defineModel<Card>({ required: true })

withDefaults(defineProps<{
  readonly?: boolean
}>(),
  { readonly: false }
)
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  max-width: max-content;
  gap: 4px;
}

.name {
  max-width: 23em;
}
</style>