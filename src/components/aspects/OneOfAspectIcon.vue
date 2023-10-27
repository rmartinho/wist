<script lang="ts">
/**
 * An icon indicating a single aspect from a subset of aspects
 * 
 * Behavior is undefined if there are multiple possible aspects selected
 *
 * @example
 * <one-of-aspect-icon :aspects="['skill', 'memory']" :value="card.aspects" />
 * <one-of-aspect-icon :aspects="['skill', 'memory']" :value="card.aspects" gray />
 */
export default {}
</script>

<template>
  <aspect-icon v-if="value" :aspect="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type AspectSet } from '@/aspects'
import AspectIcon from '@/components/aspects/AspectIcon.vue'

const props = defineProps<{
  /** The aspect subset to display one of */
  aspects: readonly string[]
  /** The aspect set from which to get the aspect values */
  value: AspectSet
}>()

const value = computed(() => props.aspects.find(a => props.value[a] != undefined && props.value[a] > 0))
</script>
