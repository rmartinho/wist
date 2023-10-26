<script lang="ts">
/**
 * A counter with an associated aspect.
 *
 * If not readonly it can be left-clicked to increase the count, right-clicked to decrease,
 * and middle-clicked to set to zero
 *
 * @example
    <aspect-counter aspect="lantern" v-model="count" />
    <aspect-counter aspect="edge" :model-value="2" readonly />
 */
export default {}
</script>

<template>
  <div class="counter">
    <aspect-icon v-if="readonly" :aspect="aspect" :gray="count == 0" />
    <aspect-button v-else :aspect="aspect" @click.left="increase" @click.middle="zero" @click.right.prevent="decrease"
      :gray="count == 0" />
    <div class="count" :class="{ hidden: count < 2 }">{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import AspectIcon from '@/components/aspects/AspectIcon.vue'
import AspectButton from '@/components/aspects/AspectButton.vue'

const count = defineModel<number>({ local: true, default: 0 })

withDefaults(defineProps<{
  /** The aspect */
  aspect: string
  /** Whether make the count readonly; defaults to false */
  readonly?: boolean
}>(),
  { readonly: false }
)

function increase() {
  if (count.value < 99) {
    count.value++;
  }
}

function decrease() {
  if (count.value > 0) {
    count.value--;
  }
}

function zero() {
  count.value = 0;
}
</script>

<style scoped>
.counter {
  display: flex;
  width: min-content;
  min-width: calc(24px + 1.2em);
  gap: 1px;
}

.count {
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  flex-direction: column;
  user-select: none;
}

.count.hidden {
  visibility: hidden;
}
</style>
