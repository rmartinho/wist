<script lang="ts">
/**
 * A group of aspect radiobuttons.
 *
 * @example
 * <aspect-radio-group :aspects="['lantern', 'forge', 'edge']" v-model="selected" />
 * <aspect-radio-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" v-model="selected" />
 */
export default {}
</script>

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs" >
    <aspect-radio v-bind="slot" :name="name" v-model="value" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { useId } from '@/utils/id'
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue'
import AspectRadio from '@/components/core/AspectRadio.vue'

const value = defineModel<string>()

defineProps<{
  aspects: readonly string[],
}>()

const name = useId('aspect-radio-')
</script>
