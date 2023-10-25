<script lang="ts">
/**
 * A group of aspect checkboxes.
 *
 * @example
 * <aspect-check-group :aspects="['lantern', 'forge', 'edge']" v-model="card.aspects"/>
 * <aspect-check-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" v-model="card.aspects" />
 */
export default {}
</script>

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-check v-bind="slot" v-model="checked[slot.aspect]" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { useBooleanAspects, type AspectSet } from '@/aspects';
import AspectComponentGroup from '@/components/groups/AspectComponentGroup.vue'
import AspectCheck from '@/components/aspects/AspectCheck.vue'

const model = defineModel<AspectSet>({ default: {} })

defineProps<{
  /** The aspects */
  aspects: readonly string[]
}>()

const checked = useBooleanAspects(model)
</script>
