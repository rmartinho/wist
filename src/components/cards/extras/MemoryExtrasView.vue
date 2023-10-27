<script lang="ts">
/**
 * A component that displays/edits additional properties of memories 
 * 
 * @example
 * <memory-extras-view v-model="card.aspects" />
 * <memory-extras-view v-model="card.aspects" readonly />
 */
export default {}
</script>

<template>
  <div class="memory-extras">
    <template v-if="readonly">
      <div>
        <aspect-subset-icon-group :aspects="extraAspects.memory" :value="aspects" />
        <one-of-aspect-icon :aspects="wisdomAspects" :value="aspects" />
        <aspect-icon v-if="hasSource" aspect="codex" :title="source"/>
      </div>
    </template>
    <template v-else>
      <div>
        <aspect-check-group :aspects="extraAspects.memory" v-model="aspects" />
        <aspect-subset-radio-group :aspects="wisdomAspects" v-model="aspects" optional :row-size="9" />
      </div>
      <div>
        <aspect-icon aspect="codex" :gray="!hasSource" />
        <input type="text" v-model="source" placeholder="Source">
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { extraAspects, wisdomAspects, type AspectSet } from '@/aspects'
import AspectIcon from '@/components/aspects/AspectIcon.vue'
import AspectCheckGroup from '@/components/groups/AspectCheckGroup.vue'
import AspectSubsetRadioGroup from '@/components/groups/AspectSubsetRadioGroup.vue'
import AspectSubsetIconGroup from '@/components/groups/AspectSubsetIconGroup.vue'
import OneOfAspectIcon from '@/components/aspects/OneOfAspectIcon.vue'

const aspects = defineModel<AspectSet>({ required: true })
const source = defineModel<string>('source', { default: '' })

withDefaults(defineProps<{
  /** Whether this view is readonly; defaults to `false` */
  readonly?: boolean
}>(),
  { readonly: false }
)

const hasSource = computed(() => source.value.length > 0)
</script>

<style scoped>
.memory-extras {
  display: flex;
  flex-flow: column;
  gap: 2px;
}

.memory-extras>div {
  display: flex;
  flex-flow: row;
  gap: 2px;
}

input[type=text] {
  width: 100%;
}
</style>