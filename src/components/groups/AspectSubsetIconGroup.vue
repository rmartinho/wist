<script lang="ts">
/**
 * A group of aspect icons that displays a subset of an AspectSet
 * 
 * @example
 * <aspect-subset-icon-group :aspects="typeAspects" :value="card.aspects" />
 */
export default {}
</script>

<template>
  <aspect-icon-group v-if="pickedAspects.length > 0" :aspects="pickedAspects" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type AspectSet } from '@/aspects'
import AspectIconGroup from '@/components/groups/AspectIconGroup.vue'

const props = defineProps<{
  /** The aspect subset to display one of */
  aspects: readonly string[]
  value: AspectSet
}>()

const pickedAspects = computed(() => props.aspects.filter(a => props.value[a] != undefined && props.value[a] > 0))
</script>