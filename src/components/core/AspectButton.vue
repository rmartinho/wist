<!--
  A button displayed as an aspect

  Usage:
    import AspectButton from 'AspectButton.vue'

    <aspect-button aspect="lantern" />
    <aspect-button aspect="forge" gray />
-->

<template>
  <button :class="{ [imageClass]: true, 'gray-icon': isGray }"></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    aspect: string,
    gray?: boolean,
  }>(),
  { gray: false }
)

const isGray = computed(() => props.gray || props.aspect == 'undefined')
const imageClass = computed(() => `icon-${props.aspect}`)
</script>

<style scoped>
@import '@/assets/styles/sprites.css';

button {
  all: unset;
  cursor: default;

  display: inline-block;
  padding: 0px;
  margin: 0px;
  height: 24px;
  width: 24px;

  transition: filter 0.4s ease;
}

button:hover:not(:disabled) {
  filter: drop-shadow(0 0 2px);
}

button:active:not(:disabled) {
  filter: drop-shadow(0 0 1px);
}
</style>
