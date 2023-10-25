<script lang="ts">
/**
 * A button that can toggle between light and dark mode
 * 
 * @example
 * <dark-mode-toggle title="Switch color scheme">
 *   <template #light-icon>
 *     <img src="light.svg">
 *   </template>
 *   <template #dark-icon>
 *     <img src="dark.svg">
 *   </template>
 * </dark-mode-toggle>
 */
export default {}
</script>

<template>
  <button @click="onToggle">
    <template v-if="isDark">
      <slot name="light-button">
        Light mode
      </slot>
    </template>
    <template v-else>
      <slot name="dark-button">
        Dark mode
      </slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorSchemes, type ColorSchemeName, isColorSchemeName } from '@/utils/color-scheme'
import { usePersistence } from '@/utils/persist'
import { parseJsonFromStorage } from '@/utils/storage'

const props = withDefaults(defineProps<{
  /** The color scheme to fall back to when no preference is set explicitly; defaults to light */
  fallback?: ColorSchemeName
}>(),
  { fallback: 'light' }
)

const storageKey = 'colorscheme'
const selected = parseJsonFromStorage(window.localStorage, storageKey, isColorSchemeName)
const colorscheme = useColorSchemes({ fallback: props.fallback, selected })
usePersistence(colorscheme, storageKey)

const isDark = computed(() => colorscheme.value ? colorscheme.value == 'dark' : props.fallback == 'dark')

function onToggle() {
  colorscheme.toggle()
}

defineSlots<{
  /** Template for the button to switch to light mode */
  'light-button'(props: {}): any
  /** Template for the button to switch to dark mode */
  'dark-button'(props: {}): any
}>()
</script>
