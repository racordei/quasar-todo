<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div
      :class="{ 'q-mt-lg': !settings.showTasksInOneList }">
      <ListHeader
        v-if="!settings.showTasksInOneList"
        bgColor="bg-green-4"
      >
        Completed
      </ListHeader>
      <q-list separator bordered>
        <Tasks
          v-for="(task, key) in tasksCompleted"
          :key="key"
          :task="task"
          :id="key"
        />
      </q-list>
    </div>
  </transition>
</template>

<script>
import Tasks from "components/Tasks/Task";
import ListHeader from "components/Shared/ListHeader";
import { mapGetters } from "vuex";

export default {
  props: ["tasksCompleted"],
  computed: {
    ...mapGetters('settings', ['settings']),
  },
  components: {
    Tasks,
    ListHeader,
  },
};
</script>

<style>
</style>