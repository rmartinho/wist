<script lang="ts">
/**
 * A list of cards
 * 
 * @emits save(card: Card) when a card is saved
 * @emits remove(card: Card) when a card is removed
 * 
 * @example
 * <card-list v-model="cards" mode="edit" />
 * 
 * <card-list v-model="cards" mode="view" />
 * 
 * <card-list v-model="cards" v-model:selected="selectedCard" mode="select" />
 */
export default {}
</script>

<template>
  <ul>
    <li v-for="(card, index) in cards" :key="card.id">
      <card-list-item v-model="cards[index]" v-on="itemEventsFor(card)" :mode="itemMode" :selected="selected == card" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type Card } from '@/card'
import CardListItem from '@/components/cards/CardListItem.vue'

const cards = defineModel<Card[]>({ default: [] })
const selected = defineModel<Card>('selected', { local: true })

const props = withDefaults(
  defineProps<{
    /** Whether to show edit controls, selection controls, or just display the item */
    mode?: 'view' | 'select' | 'edit'
  }>(),
  { mode: 'view' }
)

const emit = defineEmits<{
  save: [card: Card]
  remove: [card: Card]
}>()

const editMode = computed(() => props.mode == 'edit')
const selectMode = computed(() => props.mode == 'select')
const itemMode = computed(() => props.mode == 'edit' ? 'edit' : 'view')
const itemEventsFor = computed(() => {
  return editMode.value ? (card: Card) => ({
    save() { onSaveCard(card) },
    remove() { onRemoveCard(card.id) }
  }) : selectMode.value ? (card: Card) => ({
    click() { onSelectCard(card) }
  }) : (_card: Card) => { }
})

function onRemoveCard(id: number) {
  const index = cards.value.findIndex(c => c.id == id)
  const card = cards.value[index]
  cards.value.splice(index, 1)
  emit('remove', card)
}

function onSaveCard(card: Card) {
  emit('save', card)
}

function onSelectCard(card: Card) {
  selected.value = card
}
</script>

<style scoped>
ul {
  display: flex;
  flex-flow: row wrap;
  gap: 2px;
  padding: 0;
}

li {
  list-style: none;
}
</style>