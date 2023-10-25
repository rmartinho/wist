<script lang="ts">
/**
 * A button displayed as an aspect
 *
 * @example
 * <aspect-button aspect="lantern" @click="onClick" />
 * <aspect-button aspect="forge" gray />
 */
export default {}
</script>

<template>
  <button :class="{ [imageClass]: true, 'gray-icon': isGray }"></button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { usePreload } from '@/utils/preload'
import colorSprites from '@/assets/images/color-sprites.png?url'
import graySprites from '@/assets/images/gray-sprites.png?url'
usePreload('image', colorSprites, graySprites)

const props = withDefaults(
  defineProps<{
    /** The aspect */
    aspect: string,
    /** Whether to display this icon grayed out; defaults to false */
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
}

button:hover:not(:disabled) {
  filter: drop-shadow(0 0 2px);
}

button:active:not(:disabled) {
  filter: drop-shadow(0 0 1px);
}
</style>
