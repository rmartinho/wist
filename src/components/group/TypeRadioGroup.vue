<template>
  <aspect-radio-group :aspects="typeAspects" v-model="selected" />
</template>

<script setup lang="ts">
import { typeAspects, useSingleAspect } from '@/aspects';
import AspectRadioGroup from '@/components/group/AspectRadioGroup.vue';

const aspects = defineModel<Record<string, number>>({ required: true })

const selected = useSingleAspect(typeAspects, aspects)
</script>