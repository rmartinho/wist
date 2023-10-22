<!--
  A group of aspect radiobuttons.

  Usage:
    import AspectRadioGroup from 'AspectRadioGroup.vue'

    <aspect-radio-group :aspects="['lantern', 'forge', 'edge']" />
    <aspect-radio-group :aspects="['lantern', 'forge', 'edge', 'winter']" :row-size="2" />
-->

<template>
  <aspect-component-group :aspects="aspects" v-slot="slot" v-bind="$attrs" >
    <aspect-radio :aspect="slot.aspect" v-model="model" />
  </aspect-component-group>
</template>

<script setup lang="ts">
import { useId } from '@/utils/id';
import AspectComponentGroup from '@/components/group/AspectComponentGroup.vue';
import AspectRadio from '@/components/core/AspectRadio.vue';
import { ref } from 'vue';

const value = defineModel<string>()

defineProps<{
  aspects: readonly string[],
}>()

const name = useId('aspect-radio-');

const model = ref({ name, value })
</script>
