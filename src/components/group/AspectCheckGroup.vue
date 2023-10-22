<!--
  A group of aspect checkboxes.

  Usage:
    import AspectCheckGroup from 'AspectCheckGroup.vue'

    <aspect-check-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-check-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-check :aspect="slot.aspect" v-model="checked[slot.aspect]" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue';
import AspectCheck from '@/components/core/AspectCheck.vue';

const checked = defineModel<Record<string, boolean>>({ default: {} })

defineProps<{
  aspects: readonly string[],
}>()

</script>
