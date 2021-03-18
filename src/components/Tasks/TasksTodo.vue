<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div>
      <ListHeader
        bgColor="bg-orange-4"
        >Todo</ListHeader>
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

export default {
  props: ["tasksTodo"],
  components: {
    Tasks,
    ListHeader,
  },
};
</script>

<style>
</style>