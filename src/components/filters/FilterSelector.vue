<script lang="ts">
/**
 * A component that lets the user picks filters similar to slot filters in-game
 * 
 * @example
 * <filter-selector v-model="filter" />
 */
export default {}
</script>

<template>
  <div class="filter">
    <div class="buttons">
      <button @click="onReset">
        <cancel-icon />
      </button>
    </div>
    <single-filter-selector class="selector" v-model="filter.allOf">
      <template #icon>
        <all-of-icon />
      </template>
    </single-filter-selector>
    <single-filter-selector class="selector" v-model="filter.oneOf">
      <template #icon>
        <one-of-icon />
      </template>
    </single-filter-selector>
    <single-filter-selector class="selector" v-model="filter.noneOf">
      <template #icon>
        <none-of-icon />
      </template>
    </single-filter-selector>
  </div>
</template>

<script setup lang="ts">
import { type Slot } from '@/slot'
import SingleFilterSelector from '@/components/filters/SingleFilterSelector.vue'
import CancelIcon from '@/assets/images/cancel.svg?component'
import AllOfIcon from '@/assets/images/all-of.svg?component'
import OneOfIcon from '@/assets/images/one-of.svg?component'
import NoneOfIcon from '@/assets/images/none-of.svg?component'

const filter = defineModel<Slot>({ required: true })

const emit = defineEmits<{
  reset: []
}>()

function onReset() {
  emit('reset')
}
</script>

<style scoped>
.filter {
  display: flex;
  flex-flow: row;
  gap: 4px;
}

.filter-view {
  display: flex;
  flex-flow: row;
  gap: 2px;
}

.buttons {
  display: flex;
  flex-flow: column;
  gap: 2px;
  padding-left: 4px;
}

.selector {
  min-width: 128px;
  border: solid 1px color-mix(in srgb, var(--color-border) 20%, transparent);
  border-radius: 4px;
}

button,
svg {
  width: 24px;
}
</style>
