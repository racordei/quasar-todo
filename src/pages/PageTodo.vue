<template>
  <q-page>

    <div
      class="q-pa-md absolute full-width full-height column">

      <template v-if="downloaded">
        <div v-if="!isEmptyTasks" class="row q-mb-lg">
          <Search class="col q-mb-sm q-mr-sm" />
          <Sort class="col-3"/>
        </div>

        <q-scroll-area
          class="col">
          <!-- <div class="relative-position"> -->
            <TasksTodo
              v-if="Object.keys(tasksTodo).length"
              :tasksTodo="tasksTodo" />

            <NoTasks v-else-if="hint && !settings.showTasksInOneList" :showButton="!search">
              {{ search ? "No tasks found" : "No tasks to do today" }}
            </NoTasks>

            <TasksCompleted
              v-if="Object.keys(tasksCompleted).length"
              :tasksCompleted="tasksCompleted"
            />
          <!-- </div> -->
        </q-scroll-area>

        <div
          class="absolute-bottom text-center q-ma-lg no-pointer-events">
          <q-btn
            @click="showAddTask = true"
            round
            color="primary"
            size="24px"
            icon="add"
            class="all-pointer-events"
          />
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
          <q-spinner-hourglass
            color="primary"
            size="5em"
          />
        </span>
      </template>
      
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false" />
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import TasksTodo from "components/Tasks/TasksTodo";
import TasksCompleted from "components/Tasks/TasksCompleted";
import AddTask from "components/Tasks/Modals/AddTask";
import NoTasks from "components/Tasks/NoTasks";
import Search from "components/Tasks/Tools/Search";
import Sort from "components/Tasks/Tools/Sort";

export default {
  data() {
    return {
      showAddTask: false,
    };
  },
  computed: {
    ...mapState("tasks", ["search", "downloaded"]),
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted", "isEmptyTasks"]),
    ...mapGetters("settings", ["settings"]),
    hint() {
      let noSearch = !this.search;
      let tasksCounter = Object.keys(this.tasksTodo).length;
      tasksCounter += Object.keys(this.tasksCompleted).length;
      return noSearch || !tasksCounter;
    },
  },
  mounted() {
    this.$root.$on("showAddTask", () => {
      this.showAddTask = true;
    });
  },
  components: {
    TasksTodo,
    TasksCompleted,
    AddTask,
    NoTasks,
    Search,
    Sort,
  },
};
</script>
