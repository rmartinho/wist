<script lang="ts">
/**
 * An icon displayed as an aspect
 *
 * @example
 * <aspect-icon aspect="lantern" />
 * <aspect-icon aspect="forge" gray />
 */
export default {}
</script>

<template>
  <img :class="{ [imageClass]: true, 'gray-icon': isGray }" src="@/assets/images/blank.gif">
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** The aspect */
    aspect: string
    /** Whether to display this icon grayed out; defaults to false */
    gray?: boolean
  }>(),
  { gray: false }
)

const isGray = computed(() => props.gray || props.aspect == 'undefined')
const imageClass = computed(() => `icon-${props.aspect}`)
</script>

<style scoped>
@import '@/assets/styles/sprites.css';

img {
  padding: 0px;
  margin: 0px;
  height: 24px;
  width: 24px;
}
</style>
