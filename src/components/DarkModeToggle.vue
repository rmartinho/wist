<!--
  A button that toggles between light/dark color scheme

  Usage:
    import DarkModeToggle from 'DarkModeToggle.vue'

    <dark-mode-toggle title="Switch color scheme">
      <template #light-icon>
        <img src="light.svg">
      </template>
      <template #dark-icon>
        <img src="dark.svg">
      </template>
    <dark-mode-toggle/>
-->

<template>
  <button @click="onToggle">
    <template v-if="isDark">
      <slot name="light-icon"></slot>
    </template>
    <template v-else>
      <slot name="dark-icon"></slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useColorSchemes, type ColorSchemeName } from '@/utils/color-scheme'

const props = withDefaults(defineProps<{
  fallback?: ColorSchemeName
}>(),
  { fallback: 'light' }
)

const colorscheme = useColorSchemes({ fallback: props.fallback, selected: localStorage.colorscheme })

const isDark = computed(() => colorscheme.value ? colorscheme.value == 'dark' : props.fallback == 'dark')

function onToggle() {
  colorscheme.toggle()
}

watch(colorscheme, () => localStorage.colorscheme = colorscheme.value)
</script>
