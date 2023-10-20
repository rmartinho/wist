<!--
  An icon indicating an aspect

  Usage:
    import AspectIcon from 'AspectIcon.vue'

    <aspect-icon aspect="lantern" />
    <aspect-icon aspect="forge" gray />
-->

<template>
  <img :class="{ [imageClass]: true }" src="@/assets/images/blank.gif">
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

const imageClass = computed(() => `icon-${props.gray ? 'gray-' : 'color-'}${props.aspect}`)
</script>

<style scoped>
@import '@/assets/styles/color-sprites.css';
@import '@/assets/styles/gray-sprites.css';

img {
  display: inline-block;
  padding: 0px;
  margin: 0px;
  height: 24px;
  width: 24px;

  transition: filter 0.4s ease;
}
</style>
