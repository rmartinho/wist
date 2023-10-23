<!--
  A group of aspect counters.

  Usage:
    import AspectCounterGroup from 'AspectCounterGroup.vue'

    <aspect-counter-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-counter-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-counter :aspect="slot.aspect" v-model="counts[slot.aspect]" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { type AspectSet } from '@/aspects'
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue'
import AspectCounter from '@/components/core/AspectCounter.vue'

const counts = defineModel<AspectSet>({ default: {} })

defineProps<{
  aspects: readonly string[],
}>()
</script>
