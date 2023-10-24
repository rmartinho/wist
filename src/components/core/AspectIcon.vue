<!--
  An icon indicating an aspect

  Usage:
    import AspectIcon from 'AspectIcon.vue'

    <aspect-icon aspect="lantern" />
    <aspect-icon aspect="forge" gray />
-->

<template>
  <img :class="{ [imageClass]: true, 'gray-icon': isGray }" src="@/assets/images/blank.gif">
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

img {
  display: inline-block;
  padding: 0px;
  margin: 0px;
  height: 24px;
  width: 24px;

  transition: filter 0.4s ease;
}
</style>
