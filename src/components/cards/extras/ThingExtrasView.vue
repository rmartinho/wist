<script lang="ts">
/**
 * A component that displays/edits additional properties of things 
 * 
 * @example
 * <thing-extras-view v-model="card.aspects" />
 * <thing-extras-view v-model="card.aspects" readonly />
 */
export default {}
</script>

<template>
  <div class="thing-extras">
    <template v-if="readonly">
      <div>
        <aspect-subset-icon-group :aspects="extraAspects.thing" :value="aspects" />
        <aspect-icon v-if="hasSource" aspect="workstation" :title="source" />
      </div>
    </template>
    <template v-else>
      <div>
        <aspect-check-group :aspects="extraAspects.thing" v-model="aspects" :row-size="13" />
      </div>
      <div>
        <aspect-icon aspect="workstation" :gray="!hasSource" />
        <input type="text" v-model="source" placeholder="Source">
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type AspectSet, extraAspects } from '@/aspects'
import AspectIcon from '@/components/aspects/AspectIcon.vue'
import AspectCheckGroup from '@/components/groups/AspectCheckGroup.vue'
import AspectSubsetIconGroup from '@/components/groups/AspectSubsetIconGroup.vue'

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
.thing-extras {
  display: flex;
  flex-flow: column;
  gap: 2px;
}

.thing-extras>div {
  display: flex;
  flex-flow: row;
  gap: 2px;
}

input[type=text] {
  width: 100%;
}
</style>