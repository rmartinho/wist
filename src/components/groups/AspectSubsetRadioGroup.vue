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
  <aspect-radio-group :aspects="aspectOptions" v-model="selected" :optional="optional" :default="props.default"
    v-bind="$attrs" />
</template>

<script setup lang="ts">
import { useOneOfAspect, type AspectSet } from '@/aspects'
import AspectRadioGroup from '@/components/groups/AspectRadioGroup.vue'
import { computed } from 'vue'

const value = defineModel<AspectSet>({ required: true })

const props = defineProps<{
  /** The aspect subset to display one of */
  aspects: readonly string[]
  /** Whether this radio group allows no option to be selected */
  optional?: boolean
  /** The option that becomes selected when nothing else is */
  default?: string
}>()

const aspectOptions = computed(() =>
  props.default
    ? [...props.aspects, props.default]
    : props.aspects)

const selected = useOneOfAspect(aspectOptions, value)
</script>