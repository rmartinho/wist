<script lang="ts">
/**
 * A radiobutton with an associated aspect.
 * 
 * @emits deselect() when this button is explicitly deselected, if optional
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
    <input type="radio" :name="name" :value="aspect" v-model="value" :disabled="readonly" @click="onClick">
    <aspect-icon :aspect="aspect" :gray="aspect != value" />
  </label>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/aspects/AspectIcon.vue'

const value = defineModel<string | undefined>()

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
    /** Whether this radio can be deselected */
    optional?: boolean
  }>(),
  { readonly: false, optional: false }
)

const emit = defineEmits<{
  deselect: []
}>()

function onClick() {
  if (props.optional && value.value == props.aspect) {
    emit('deselect')
  }
}

if (props.checked) {
  value.value = props.aspect
}
</script>

<style scoped>
input[type=radio] {
  appearance: none;
}

label {
  display: flex;
}

label:hover:not(.disabled) :deep(img) {
  filter: drop-shadow(0 0 2px);
}

label:active:not(.disabled) :deep(img) {
  filter: drop-shadow(0 0 1px);
}
</style>