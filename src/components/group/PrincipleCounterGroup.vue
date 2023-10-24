<template>
  <aspect-counter-group :aspects="principleAspects" v-model="aspects" :row-size="rowSize" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { principleAspects } from '@/aspects'
import AspectCounterGroup from '@/components/group/AspectCounterGroup.vue'

const aspects = defineModel<Record<string, number>>({ required: true })

withDefaults(defineProps<{
  rowSize?: number,
}>(),
  { rowSize: 8 }
)
</script>