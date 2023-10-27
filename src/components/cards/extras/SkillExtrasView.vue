<script lang="ts">
/**
 * A component that displays/edits additional properties of skills 
 * 
 * @example
 * <skill-extras-view v-model="card.aspects" />
 * <skill-extras-view v-model="card.aspects" readonly />
 */
export default {}
</script>

<template>
  <div class="skill-extras">
    <template v-if="readonly">
      <div>
        <aspect-subset-icon-group :aspects="extraAspects.skill" :value="aspects" />
        <aspect-subset-icon-group :aspects="cleanseAspects" :value="aspects" />
        <aspect-subset-icon-group :aspects="wisdomAspects" :value="aspects" />
        <aspect-subset-icon-group :aspects="soulAspects" :value="aspects" />
      </div>
    </template>
    <template v-else>
      <div>
        <aspect-check-group :aspects="extraAspects.skill" v-model="aspects" />
        <aspect-subset-radio-group :aspects="cleanseAspects" v-model="aspects" optional />
      </div>
      <div>
        <aspect-subset-radio-group :aspects="wisdomAspects" v-model="aspects" optional :row-size="9" />
        <aspect-subset-radio-group v-if="boundWisdom" :aspects="attunements[boundWisdom]" v-model="aspects" optional
          default="fulfilled" :row-size="3" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { type AspectSet, extraAspects, wisdomAspects, soulAspects, attunements, cleanseAspects } from '@/aspects'
import AspectCheckGroup from '@/components/groups/AspectCheckGroup.vue'
import AspectSubsetRadioGroup from '@/components/groups/AspectSubsetRadioGroup.vue'
import AspectSubsetIconGroup from '@/components/groups/AspectSubsetIconGroup.vue'

const aspects = defineModel<AspectSet>({ required: true })

withDefaults(defineProps<{
  /** Whether this view is readonly; defaults to `false` */
  readonly?: boolean
}>(),
  { readonly: false }
)

const boundWisdom = computed(() => wisdomAspects.find(a => aspects.value[a] != undefined && aspects.value[a] > 0))
watch(boundWisdom, () => {
  if (!boundWisdom.value || !attunements[boundWisdom.value].find(a => aspects.value[a] > 0)) {
    soulAspects.forEach(a => delete aspects.value[a])
  }
})
</script>

<style scoped>
.skill-extras {
  display: flex;
  flex-flow: column;
  gap: 2px;
}

.skill-extras>div {
  display: flex;
  flex-flow: row;
  gap: 2px;
}
</style>