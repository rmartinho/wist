<!--
  A group of aspect-based components organized in rows.

  Usage:
    import AspectComponentGroup from 'AspectComponentGroup.vue'

    <aspect-component-group :aspects="['lantern', 'forge', 'edge']" v-slot="slot" v-bind="$attrs">
      <aspect-icon :aspect="slot.aspect" />
    </aspect-component-group>
-->

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
    aspects: readonly string[],
    rowSize?: number,
  }>(),
  { rowSize: 9 }
)

const nCols = computed(() => Math.min(props.aspects.length, props.rowSize))
</script>

<style scoped>
.aspect-group {
  display: grid;
  grid-auto-flow: row;
  grid-template: auto / repeat(v-bind(nCols), min-content);
  height: min-content;
  gap: 2px;
}
</style>