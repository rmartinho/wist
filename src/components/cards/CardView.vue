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
      <div class="title-row">
        <div class="name">
          <span v-text="card.name ?? '<missing name>'"></span>
        </div>
        <div class="title-icons">
          <one-of-aspect-icon :aspects="typeAspects" :value="card.aspects" />
          <component v-if="extrasView" :is="extrasView" readonly v-model="card.aspects" v-model:source="card.source" />
        </div>
      </div>
      <aspect-counter-group :aspects="principleAspects" v-model="card.aspects" readonly />
    </template>
    <template v-else>
      <input type="text" v-focus="card.name.length == 0" v-model="card.name" placeholder="Card name">
      <aspect-subset-radio-group :aspects="typeAspects" v-model="card.aspects" />
      <aspect-counter-group :aspects="principleAspects" v-model="card.aspects" />
      <component v-if="extrasView" :is="extrasView" v-model="card.aspects" v-model:source="card.source" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { extraAspects, principleAspects, typeAspects, useOneOfAspect } from '@/aspects'
import { type Card } from '@/card'
import AspectCounterGroup from '@/components/groups/AspectCounterGroup.vue'
import AspectSubsetRadioGroup from '@/components/groups/AspectSubsetRadioGroup.vue'
import OneOfAspectIcon from '@/components/aspects/OneOfAspectIcon.vue'
import MemoryExtrasView from '@/components/cards/extras/MemoryExtrasView.vue'
import SkillExtrasView from '@/components/cards/extras/SkillExtrasView.vue'
import ThingExtrasView from '@/components/cards/extras/ThingExtrasView.vue'

const card = defineModel<Card>({ required: true })

withDefaults(defineProps<{
  /** Whether this view is readonly; defaults to `false` */
  readonly?: boolean
}>(),
  { readonly: false }
)

const extrasViews = {
  soul: undefined,
  skill: SkillExtrasView,
  memory: MemoryExtrasView,
  thing: ThingExtrasView,
  room: undefined,
  workstation: undefined,
} as any

const cardType = useOneOfAspect(typeAspects, card.value.aspects)
const extrasView = computed(() => cardType.value ? extrasViews[cardType.value] : undefined)

watch(extrasView, () => {
  if (!cardType.value) {
    return
  }
  extraAspects[cardType.value].forEach(a => delete card.value.aspects[a])
  delete card.value.source
})
</script>

<style scoped>
.card {
  display: flex;
  flex-flow: column;
  gap: 4px;
}

.name {
  padding: var(--padding-input);
  min-width: 6em;
}

div.name {
  max-width: 23em;
}

.title-row {
  display: flex;
  flex-flow: row;
  gap: 4px;
}

.title-icons {
  margin-left: auto;
  display: flex;
  flex-flow: row;
  gap: 4px;
}
</style>