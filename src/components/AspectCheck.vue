<!--
  A checkbox with an associated aspect.

  Usage:
    import AspectCheck from 'AspectCheck.vue'

    <aspect-check aspect="lantern" />
    <aspect-check aspect="forge" v-model="selected" />
    <aspect-check aspect="edge" :model-value="false" readonly />
-->

<template>
  <label :class="{ disabled: readonly }">
    <input type="checkbox" v-model="model" :disabled="readonly">
    <aspect-icon :aspect="aspect" :gray="!model" />
  </label>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/AspectIcon.vue'

const props = withDefaults(defineProps<{
  aspect: string,
  readonly?: boolean,
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

label:hover:not(.disabled) {
  filter: drop-shadow(0 0 2px);
}

label:active:not(.disabled) {
  filter: drop-shadow(0 0 1px);
}
</style>