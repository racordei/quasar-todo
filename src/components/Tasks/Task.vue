<template>
  <q-item
    @click="updateTask({ id, updates: { completed: !task.completed } })"
    v-touch-hold:1000.mouse="() => (showEditTask = true)"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strike': task.completed }"
        v-html="$options.filters.searchHighlight(task.name, search)"
      >
      </q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column justify-center">
          <q-item-label caption>{{ task.dueDate | niceDate }}</q-item-label>
          <q-item-label v-if="task.dueTime" class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn
          @click.stop="showEditTask = true"
          flat
          round
          dense
          color="primary"
          icon="edit"
        />
        <q-btn
          @click.stop="promptToDelete(id)"
          flat
          round
          dense
          color="red"
          icon="delete"
        />
      </div>
    </q-item-section>

    <q-dialog v-model="showEditTask">
      <EditTask :id="id" :task="task" @close="showEditTask = false" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import EditTask from './Modals/EditTask.vue'
import { date } from 'quasar'

const { formatDate } = date

export default {
  props: ['task', 'id'],
  data() {
    return {
      showEditTask: false,
    }
  },
  computed: {
    ...mapState('tasks', ['search']),
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Realy delete?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.deleteTask(id)
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'delete',
            message: 'Deleted',
          })
        })
    },
  },
  filters: {
    niceDate(value) {
      return formatDate(value, 'DD-MMM-YYYY')
    },
    searchHighlight(value, search) {
      if (search) {
        let reg = new RegExp(search, 'gi')
        return value.replace(reg, (match) => {
          return `<span class="bg-yellow-6">${match}</span>`
        })
      }
      return value
    },
  },
  components: { EditTask },
}
</script>

<style></style>
