<template>
  <aspect-counter-group :aspects="principleAspects" v-model="aspects" :row-size="8" />
</template>

<script setup lang="ts">
import { principleAspects } from '@/aspects';
import AspectCounterGroup from '@/components/group/AspectCounterGroup.vue';

const aspects = defineModel<Record<string, number>>({ required: true })
</script>