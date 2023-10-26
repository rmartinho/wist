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
  <div class="card-list">
    <div v-if="editMode" class="buttons">
      <button class="add-button" @click="onAddCard?.()" title="Add">
        <add-icon />
      </button>
    </div>
    <ul>
      <li v-for="(card, index) in cards" :key="card.id">
        <card-list-item v-model="cards[index]" v-on="eventsFor(card)" :mode="itemMode" :selected="selected == card" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { makeCard, type Card } from '@/card'
import CardListItem from '@/components/cards/CardListItem.vue'
import AddIcon from '@/assets/images/add.svg'

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
const eventsFor = computed(() => {
  return editMode.value ? (card: Card) => ({
    save() { onSaveCard(card) },
    remove() { onRemoveCard(card.id) }
  }) : selectMode.value ? (card: Card) => ({
    click() { onSelectCard(card) }
  }) : (_card: Card) => { }
})

let id = Math.max(0, ...cards.value.map(c => c.id)) + 1 // TODO force ids!!

function onAddCard() {
  cards.value.unshift(makeCard())
}

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
  display: inline-grid;
  grid: auto-flow / masonry;
  gap: 2px;
  padding: 0;
}

li {
  display: inline-grid;
  width: min-content;
  list-style: none;
}
</style>