<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div class="q-mt-lg">
      <ListHeader
        bgColor="bg-green-4"
        >Completed</ListHeader>
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

export default {
  props: ["tasksCompleted"],
  components: {
    Tasks,
    ListHeader,
  },
};
</script>

<style>
</style>