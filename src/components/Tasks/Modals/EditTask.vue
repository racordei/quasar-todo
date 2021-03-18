<template>
  <q-card>
    <ModalHeader>Edit Task</ModalHeader>
    <q-form @submit="submitForm">
      <q-card-section>
        <ModalTaskName :name.sync="taskToSubmit.name" />

        <ModalDueDate :dueDate.sync="taskToSubmit.dueDate" />

        <ModalDueTime
          v-if="taskToSubmit.dueDate"
          :dueTime.sync="taskToSubmit.dueTime"
        />
      </q-card-section>

      <ModalButtons />
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
import handleTask from 'src/mixins/mixin-handle-task'

export default {
  props: ['id', 'task'],
  data() {
    return {
      taskToSubmit: {},
    }
  },
  mixins: [handleTask],
  methods: {
    ...mapActions('tasks', ['updateTask']),
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit,
      })
      this.$emit('close')
    },
  },
  created() {
    this.taskToSubmit = Object.assign({}, this.task)
  },
}
</script>

<style>
</style>