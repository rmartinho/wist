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
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-radio v-bind="slot" :name="name" v-model="value" :optional="optional" v-on="itemEvents" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useId } from '@/utils/id'
import AspectComponentGroup from '@/components/groups/AspectComponentGroup.vue'
import AspectRadio from '@/components/aspects/AspectRadio.vue'

const value = defineModel<string | undefined>()

const props = withDefaults(defineProps<{
  /** The aspects */
  aspects: readonly string[]
  /** Whether this radio group allows no option to be selected */
  optional?: boolean
  /** The option that becomes selected when nothing else is */
  default?: string,
}>(),
  { optional: false }
)

const name = useId('aspect-radio-')

const itemEvents = computed(() => {
  const canDeselect = props.optional || props.default
  return canDeselect
    ? {
      deselect() { value.value = props.default }
    }
    : {}
})
</script>
