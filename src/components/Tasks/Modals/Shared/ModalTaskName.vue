<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      autofocus
      clearable
      label="Task name"
      :value="name"
      @input="$emit('update:name', $event)"
      :rules="[(val) => !!val || 'Nome da task é mandatório']"
      class="col"
      v-select-all
    />
  </div>
</template>

<script>
import { selectAll } from 'src/directives/directive-select-all'

export default {
  props: ["name"],
  directives: {
    selectAll
  },
};
</script>

<style>
</style>