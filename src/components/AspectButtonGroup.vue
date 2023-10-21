<!--
  A group of aspect buttons.

  Usage:
    import AspectButtonGroup from 'AspectButtonGroup.vue'

    <aspect-button-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-button-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <div class="aspects">
    <template v-for="aspect in aspects" :key="aspect">
      <aspect-button :aspect="aspect" @click="click(aspect)"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AspectButton from './AspectButton.vue';

const props = withDefaults(
  defineProps<{
    aspects: string[],
    rowSize?: number,
  }>(),
  { rowSize: 9 }
)

const emit = defineEmits<{
  click: [aspect: string],
}>()

const nCols = computed(() => Math.min(props.aspects.length, props.rowSize))

function click(aspect: string) {
  emit('click', aspect)
}
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