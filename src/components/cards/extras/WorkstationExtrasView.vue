<script lang="ts">
/**
 * A component that displays/edits additional properties of workstations 
 * 
 * @example
 * <workstation-extras-view v-model="card.aspects" />
 * <workstation-extras-view v-model="card.aspects" readonly />
 */
export default {}
</script>

<template>
  <div class="workstation-extras">
    <template v-if="readonly">
      <div>
        <aspect-subset-icon-group :aspects="wisdomAspects" :value="aspects" />
      </div>
    </template>
    <template v-else>
      <div>
        <aspect-subset-radio-group :aspects="wisdomAspects" v-model="aspects" optional :row-size="9" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type AspectSet, wisdomAspects } from '@/aspects'
import AspectSubsetIconGroup from '@/components/groups/AspectSubsetIconGroup.vue'
import AspectSubsetRadioGroup from '@/components/groups/AspectSubsetRadioGroup.vue'

const aspects = defineModel<AspectSet>({ required: true })

withDefaults(defineProps<{
  /** Whether this view is readonly; defaults to `false` */
  readonly?: boolean
}>(),
  { readonly: false }
)
</script>

<style scoped>
.workstation-extras {
  display: flex;
  flex-flow: column;
  gap: 2px;
}

.workstation-extras>div {
  display: flex;
  flex-flow: row;
  gap: 2px;
}
</style>