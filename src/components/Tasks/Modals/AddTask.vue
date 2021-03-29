<template>
  <q-card>
    <ModalHeader>Add Task</ModalHeader>
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
import { date } from 'quasar'
import { mapActions } from 'vuex'
import handleTask from 'src/mixins/mixin-handle-task'

export default {
  data() {
    return {
      taskToSubmit: {
        name: '',
        dueDate: '',
        dueTime: date.formatDate(Date.now(), 'HH:mm:ss'),
        completed: false,
      },
    }
  },
  mixins: [handleTask],
  methods: {
    submitTask() {
      this.addTask(this.taskToSubmit)
      this.$emit('close')
    },
    ...mapActions('tasks', ['addTask']),
  },
}
</script>

<style>
</style>