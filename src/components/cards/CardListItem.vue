<script lang="ts">
/**
 * A card view designed to be shown in a list
 * 
 * @emits edit(editing: boolean) when editing starts or ends
 * @emits save() when changes to the card are saved 
 * @emits remove() when the card is to be removed
 * 
 * @example
 * <card-list-item v-model="card" />
 * 
 * <card-list-item v-model="card" mode="view" />
 * 
 * <card-list-item v-model="card" mode="select" />
 */
export default {}
</script>

<template>
  <div class="item" :class="{ selected }" v-on="selectMode ? { click: onSelect } : {}">
    <div v-if="editMode" class="buttons">
      <button v-if="editing" title="Save" :disabled="!isValid" @click="onSave">
        <save-icon />
      </button>
      <button v-else title="Edit" @click="onEdit">
        <edit-icon />
      </button>
      <button v-if="!editing" title="Remove" :class="{ danger: removing }" v-focus @click="onRemove"
        @focusout="onStopRemove">
        <remove-icon />
      </button>
      <button v-else title="Cancel" @click="onCancel">
        <cancel-icon />
      </button>
    </div>
    <card-view v-model="card" :readonly="!editMode" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRevertableRef } from '@/utils/revert'
import { hasAnyAspect, principleAspects } from '@/aspects'
import { cardIsValid, type Card } from '@/card'
import CardView from '@/components/cards/CardView.vue'
import SaveIcon from '@/assets/images/save.svg?component'
import EditIcon from '@/assets/images/edit.svg?component'
import CancelIcon from '@/assets/images/cancel.svg?component'
import RemoveIcon from '@/assets/images/remove.svg?component'

const model = defineModel<Card>({ required: true })
const selected = defineModel<boolean>('selected', { local: true, required: false })
const card = useRevertableRef(model)

const props = withDefaults(defineProps<{
  /** Whether to show edit controls, selection controls, or just display the item */
  mode?: 'edit' | 'select' | 'view'
}>(),
  { mode: 'edit' }
)

const emit = defineEmits<{
  edit: [editing: boolean]
  save: []
  remove: []
}>()

const editMode = computed(() => props.mode == 'edit')
const selectMode = computed(() => props.mode == 'select')

const editing = ref(props.mode == 'edit' && !hasAnyAspect(card.value.aspects, ...principleAspects))
watch(editing, () => emit('edit', editing.value))

const removing = ref(false)

const isValid = computed(() => cardIsValid(card.value))
const hasValidOld = computed(() => cardIsValid(card.oldValue))

function onSave() {
  editing.value = false
  card.save()
  emit('save')
}

function onEdit() {
  editing.value = true
}

function onCancel() {
  if (hasValidOld.value) {
    card.revert()
    editing.value = false
  } else {
    emit('remove')
  }
}

function onRemove() {
  if (removing.value) {
    emit('remove')
  } else {
    removing.value = true
  }
}

function onStopRemove() {
  removing.value = false
}

function onSelect() {
  selected.value = !selected.value
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: flex-start;
  padding: 4px;
  max-width: max-content;
  border: dotted 1px;
  border-radius: 4px;
  gap: 2px;
}

.item.selected {
  border: solid 1px;
}

.danger :deep(svg) {
  color: var(--color-danger);
  stroke: var(--color-danger);
}

.buttons {
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 2px;
}

button {
  width: 24px;
  height: 24px;
}
</style>