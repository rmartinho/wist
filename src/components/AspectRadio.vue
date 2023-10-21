<!--
  A radiobutton with an associated aspect.

  Usage:
    import AspectRadio from 'AspectRadio.vue'

    const model = ref({ name: 'group1', value: 'edge' })

    <aspect-radio aspect="lantern" name="radio" v-model="model" />
    <aspect-radio aspect="forge" name="radio" v-model="model" />
    <aspect-radio aspect="edge" name="radio" model-value="model" readonly />
-->

<template>
  <label :class="{ disabled: readonly }">
    <input type="radio" :name="model.name" :value="aspect" v-model="model.value" :disabled="readonly">
    <aspect-icon :aspect="aspect" :gray="aspect != model.value" />
  </label>
</template>

<script setup lang="ts">
import AspectIcon from './AspectIcon.vue';

type Model = {
  name: string,
  value?: string,
}

const model = defineModel<Model>({ local: true, required: true })

const props = withDefaults(
  defineProps<{
    aspect: string,
    checked?: boolean,
    readonly?: boolean,
  }>(),
  { readonly: false }
)

if (props.checked) {
  model.value.value = props.aspect
}
</script>

<style scoped>
input[type=radio] {
  appearance: none;
}

label {
  display: inline-flex;
}

label:hover:not(.disabled) {
  filter: drop-shadow(0 0 2px);
}

label:active:not(.disabled) {
  filter: drop-shadow(0 0 1px);
}
</style>