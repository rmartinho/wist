<script lang="ts">
/**
 * A group of aspect counters
 *
 * @example
 * <aspect-counter-group :aspects="['lantern', 'forge', 'edge']" v-model="card.aspects" />
 * <aspect-counter-group :aspects="['lantern', 'forge', 'edge', 'winter']" v-model="card.aspects" :row-size="2" />
 * <aspect-counter-group :aspects="['lantern', 'forge', 'edge']" v-model="card.aspects" readonly/>
 */
export default {}
</script>

<template>
  <aspect-component-group :aspects="filteredAspects" v-slot="slot" v-bind="$attrs">
    <aspect-counter v-bind="slot" v-model="counts[slot.aspect]" :readonly="readonly" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type AspectSet } from '@/aspects'
import AspectComponentGroup from '@/components/groups/AspectComponentGroup.vue'
import AspectCounter from '@/components/aspects/AspectCounter.vue'

const counts = defineModel<AspectSet>({ default: {} })

const props = withDefaults(defineProps<{
  /** The aspects */
  aspects: readonly string[]
  /** Whether to make the counters readonly; defaults to false */
  readonly?: boolean
}>(),
  { readonly: false }
)

const filteredAspects = computed(() => {
  if (!props.readonly) {
    return props.aspects
  }

  return props.aspects
    .filter(a => counts.value[a] > 0)
    .sort((a, b) => counts.value[b] - counts.value[a])
}) 
</script>
