<script lang="ts">
/**
 * A group of aspect-based components organized in rows.
 * 
 * @example
 * <aspect-component-group :aspects="['lantern', 'forge', 'edge']" v-slot="slot" v-bind="$attrs">
 *   <aspect-icon v-bind="slot" :aspect="slot.aspect" />
 * </aspect-component-group>
 */
 export default {}
</script>

<template>
  <div class="aspect-group">
    <template v-for="aspect in aspects" :key="aspect">
      <slot :aspect="aspect" v-bind="$attrs"></slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** The aspects */
    aspects: readonly string[],
    /** The maximum number of components per row; defaults to 8 */
    rowSize?: number,
  }>(),
  { rowSize: 8 }
)

const nCols = computed(() => Math.min(props.aspects.length, props.rowSize))
</script>

<style scoped>
.aspect-group {
  display: grid;
  grid: auto-flow / repeat(v-bind(nCols), min-content);
  gap: 2px;
}
</style>