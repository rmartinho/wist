<template>
  <card-editor v-model="card"></card-editor>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cleanAspectSet } from './aspects';
import CardEditor from './components/CardEditor.vue'

const card = ref({ id: 0, name: '', aspects: cleanAspectSet() })
</script>
