<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <ListHeader
        v-if="!settings.showTasksInOneList"
        bgColor="bg-orange-4">
        Todo
      </ListHeader>
      <q-list separator bordered>
        <Tasks
          v-for="(task, key) in tasksTodo"
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
  props: ["tasksTodo"],
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