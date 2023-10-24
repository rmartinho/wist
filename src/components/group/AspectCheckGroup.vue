<!--
  A group of aspect checkboxes.

  Usage:
    import AspectCheckGroup from 'AspectCheckGroup.vue'

    <aspect-check-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-check-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-check v-bind="slot" v-model="checked[slot.aspect]" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { useBooleanAspects, type AspectSet } from '@/aspects';
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue'
import AspectCheck from '@/components/core/AspectCheck.vue'

const model = defineModel<AspectSet>({ default: {} })

defineProps<{
  aspects: readonly string[],
}>()

const checked = useBooleanAspects(model)
</script>
