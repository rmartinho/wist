<!--
  An icon indicating a type given an AspectSet

  Usage:
    import TypeIcon from 'TypeIcon.vue'

    <type-icon :aspects="card.aspects" />
-->

<template>
  <aspect-icon :aspect="type" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { typeAspects, type AspectSet } from '@/aspects'
import AspectIcon from './AspectIcon.vue'

const props = defineProps<{
  aspects: AspectSet,
}>()

const type = computed(() => {
  return typeAspects.find(a => props.aspects[a] > 0) ?? 'undefined'
})
</script>
