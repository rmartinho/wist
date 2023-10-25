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
  <button>
    <aspect-icon :aspect="aspect" :gray="gray" />
  </button>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/aspects/AspectIcon.vue'

withDefaults(
  defineProps<{
    /** The aspect */
    aspect: string
    /** Whether to display this icon grayed out; defaults to false */
    gray?: boolean
  }>(),
  { gray: false }
)
</script>

<style scoped>
button {
  padding: 0px;
  margin: 0px;
  height: 24px;
  width: 24px;
}

button:hover:not(:disabled) img {
  filter: none;
}

button:active:not(:disabled) img {
  filter: none;
}
</style>
