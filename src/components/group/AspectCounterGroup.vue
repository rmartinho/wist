<!--
  A group of aspect counters. When read-only the counters are sorted and filtered.

  Usage:
    import AspectCounterGroup from 'AspectCounterGroup.vue'

    const aspects = { lantern:3, forge: 1, knock: 4 }

    <aspect-counter-group :aspects="['lantern', 'forge', 'edge']" v-model="aspects" />
    <aspect-counter-group :aspects="['lantern', 'forge', 'edge', 'winter']" v-model="aspects" :row-size="2" />
    <aspect-counter-group :aspects="['lantern', 'forge', 'edge']" v-model="aspects" readonly/>
-->

<template>
  <aspect-component-group :aspects="filteredAspects" v-slot="slot" v-bind="$attrs">
    <aspect-counter v-bind="slot" v-model="counts[slot.aspect]" :readonly="readonly" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type AspectSet } from '@/aspects'
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue'
import AspectCounter from '@/components/core/AspectCounter.vue'

const counts = defineModel<AspectSet>({ default: {} })

const props = withDefaults(defineProps<{
  aspects: readonly string[],
  readonly?: boolean,
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
