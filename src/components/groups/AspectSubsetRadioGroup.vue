<script lang="ts">
/**
 * A group of aspect radiobuttons that operates on a subset of an AspectSet
 * 
 * @example
 * <aspect-subset-radio-group :aspects="typeAspects" v-model="card.aspects" />
 */
export default {}
</script>

<template>
  <aspect-radio-group :aspects="aspects" v-model="selected" />
</template>

<script setup lang="ts">
import { useOneOfAspect, type AspectSet } from '@/aspects'
import AspectRadioGroup from '@/components/groups/AspectRadioGroup.vue'

const value = defineModel<AspectSet>({ required: true })

const props = defineProps<{
  /** The aspect subset to display one of */
  aspects: readonly string[],
}>()

const selected = useOneOfAspect(props.aspects, value)
</script>