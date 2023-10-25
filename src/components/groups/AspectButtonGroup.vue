<script lang="ts">
/**
 * A group of aspect buttons.
 *
 * @emits click(aspect: string): when one of the buttons is clicked; the aspect of the button is given
 *
 * @example
 *   <aspect-button-group :aspects="['lantern', 'forge', 'edge']" />
 *   <aspect-button-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
*/
export default {}
</script>

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-button v-bind="slot" @click="onClick(slot.aspect)" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import AspectComponentGroup from '@/components/groups/AspectComponentGroup.vue'
import AspectButton from '@/components/aspects/AspectButton.vue'

defineProps<{
  /** The aspects */
  aspects: readonly string[]
}>()

const emit = defineEmits<{
  click: [aspect: string]
}>()

function onClick(aspect: string) {
  emit('click', aspect)
}
</script>
