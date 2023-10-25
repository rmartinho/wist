<script lang="ts">
/**
 * A group of aspect icons.
 *
 * @example
 * <aspect-icon-group :aspects="['lantern', 'forge', 'edge']" />
 * <aspect-icon-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
 */
export default {}
</script>

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-icon v-bind="slot" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import AspectComponentGroup from '@/components/groups/AspectComponentGroup.vue'
import AspectIcon from '@/components/aspects/AspectIcon.vue'

defineProps<{
  /** The aspects */
  aspects: readonly string[],
}>()
</script>