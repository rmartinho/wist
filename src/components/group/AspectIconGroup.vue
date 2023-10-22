<!--
  A group of aspect icons.

  Usage:
    import AspectIconGroup from 'AspectIconGroup.vue'

    <aspect-icon-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-icon-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs">
    <aspect-icon :aspect="slot.aspect" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue';
import AspectIcon from '@/components/core/AspectIcon.vue';

defineProps<{
  aspects: readonly string[],
}>()
</script>