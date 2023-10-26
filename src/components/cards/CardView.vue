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
      <div class="name">
        <span v-text="card.name ?? '<missing name>'"></span>
      </div>
      <one-of-aspect-icon :aspects="typeAspects" :value="card.aspects" />
      <aspect-counter-group :aspects="principleAspects" v-model="card.aspects" readonly />
    </template>
    <template v-else>
      <input class="name" type="text" v-focus="card.name.length == 0" v-model="card.name" placeholder="Card name">
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
  flex-flow: column;
  gap: 4px;
  min-width: 128px;
}

.name {
  padding: 0.1rem;
}

div.name {
  max-width: 23em;
}
</style>