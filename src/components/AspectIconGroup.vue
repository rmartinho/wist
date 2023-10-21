<!--
  A group of aspect icons.

  Usage:
    import AspectIconGroup from 'AspectIconGroup.vue'

    <aspect-icon-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-icon-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <div class="aspects">
    <template v-for="aspect in aspects" :key="aspect">
      <aspect-icon :aspect="aspect" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AspectIcon from './AspectIcon.vue';

const props = withDefaults(
  defineProps<{
    aspects: string[],
    rowSize?: number,
  }>(),
  { rowSize: 9 }
)

const nCols = computed(() => Math.min(props.aspects.length, props.rowSize))

</script>

<style scoped>
.aspects {
  display: grid;
  grid-auto-flow: row;
  grid-template: auto / repeat(v-bind(nCols), min-content);
  height: min-content;
  gap: 2px;
}
</style>