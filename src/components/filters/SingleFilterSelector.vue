<script lang="ts">
/**
 * A component that lets the user picks one component of a slot filter
 * 
 * @example
 * <single-filter-selector v-model="allOf" />
 */
export default {}
</script>

<template>
  <div class="single-filter">
    <div>
      <slot class="icon" name="icon"></slot>
    </div>
    <aspect-counter-group :aspects="filterAspects" v-model="filter" :row-size="6" />
  </div>
</template>

<script setup lang="ts">
import { filterAspects, type AspectSet } from '@/aspects'
import AspectCounterGroup from '@/components/groups/AspectCounterGroup.vue'

const filter = defineModel<AspectSet>({ required: true })
</script>

<style scoped>
.single-filter {
  display: flex;
  flex-flow: row;
  gap: 2px;
}

.icon {
  width: 24px;
}
</style>
