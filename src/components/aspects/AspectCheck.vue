<script lang="ts">
/**
 * A checkbox with an associated aspect
 *
 * @example
 * <aspect-check aspect="lantern" />
 * <aspect-check aspect="forge" v-model="selected" />
 * <aspect-check aspect="edge" checked readonly />
 */
export default {}
</script>

<template>
  <label :class="{ disabled: readonly }">
    <input type="checkbox" v-model="model" :disabled="readonly">
    <aspect-icon :aspect="aspect" :gray="!model" />
  </label>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/aspects/AspectIcon.vue'

const props = withDefaults(defineProps<{
  /** The aspect */
  aspect: string,
  /** Whether make the checkbox readonly; defaults to false */
  readonly?: boolean,
  /** Whether the checkbox starts checked; defaults to false */
  checked?: boolean,
}>(),
  { readonly: false }
)

const model = defineModel<boolean>({ local: true, default: false })
if (props.checked) {
  model.value = true
}
</script>

<style scoped>
input[type=checkbox] {
  appearance: none;
}

label {
  display: inline-flex;
}

label:hover:not(.disabled) :deep(img) {
  filter: drop-shadow(0 0 2px);
}

label:active:not(.disabled) :deep(img) {
  filter: drop-shadow(0 0 1px);
}
</style>
