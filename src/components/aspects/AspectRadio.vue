<script lang="ts">
/**
 * A radiobutton with an associated aspect.
 *
 * @example
 * <aspect-radio aspect="lantern" name="foo" v-model="model" />
 * <aspect-radio aspect="forge" name="foo" v-model="model" />
 * <aspect-radio aspect="edge" name="foo" :model-value="model" readonly />
 */
export default {}
</script>

<template>
  <label :class="{ disabled: readonly }">
    <input type="radio" :name="name" :value="aspect" v-model="model" :disabled="readonly">
    <aspect-icon :aspect="aspect" :gray="aspect != model" />
  </label>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/aspects/AspectIcon.vue'

const model = defineModel<string>({ local: true })

const props = withDefaults(
  defineProps<{
    /** The aspect */
    aspect: string
    /** This name of the radio group this radiobutton belongs to */
    name: string
    /** Whether the radiobutton starts checked; defaults to false */
    checked?: boolean
    /** Whether make the radiobutton readonly; defaults to false */
    readonly?: boolean
  }>(),
  { readonly: false }
)

if (props.checked) {
  model.value = props.aspect
}
</script>

<style scoped>
input[type=radio] {
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