<script lang="ts">
/**
 * A component that displays and allows editing a card
 * 
 * @example
 * <card-view v-model="card" />
 * <card-view v-model="card" readonly />
 */
export default {}
</script>

<template>
  <div class="card">
    <template v-if="readonly">
      <span class="name">{{ card.name ? card.name : '<missing name>' }}</span>
      <one-of-aspect-icon :aspects="typeAspects" :value="card.aspects" />
      <aspect-counter-group :aspects="principleAspects" v-model="card.aspects" readonly />
    </template>
    <template v-else>
      <input type="text" v-focus v-model="card.name" placeholder="Card name">
      <aspect-subset-radio-group :aspects="typeAspects" v-model="card.aspects" />
      <aspect-counter-group :aspects="principleAspects" v-model="card.aspects" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { principleAspects, typeAspects } from '@/aspects'
import { type Card } from '@/card'
import AspectCounterGroup from '@/components/groups/AspectCounterGroup.vue'
import AspectSubsetRadioGroup from '@/components/groups/AspectSubsetRadioGroup.vue'
import OneOfAspectIcon from '@/components/aspects/OneOfAspectIcon.vue'

const card = defineModel<Card>({ required: true })

withDefaults(defineProps<{
  /** Whether this view is readonly; defaults to `false` */
  readonly?: boolean
}>(),
  { readonly: false }
)
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  min-width: 128px;
  max-width: max-content;
  gap: 4px;
}

.name {
  max-width: 23em;
}
</style>