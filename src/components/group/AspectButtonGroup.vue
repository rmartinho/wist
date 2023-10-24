<!--
  A group of aspect buttons.

  Usage:
    import AspectButtonGroup from 'AspectButtonGroup.vue'

    <aspect-button-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-button-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-button v-bind="slot" @click="click(slot.aspect)" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue'
import AspectButton from '@/components/core/AspectButton.vue'

defineProps<{
  aspects: readonly string[],
}>()

const emit = defineEmits<{
  click: [aspect: string],
}>()

function click(aspect: string) {
  emit('click', aspect)
}
</script>
