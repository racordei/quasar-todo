import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { showErrorMessage } from 'src/functions/function-show-message';

export function updateTask({ dispatch }, payload) {
  dispatch('fbUpdateTask', payload)
}

export function deleteTask({ dispatch }, id) {
  dispatch('fbDeleteTask', id)
}

export function addTask({ dispatch }, task) {
  let taskId = uid()
  let payload = {
    id: taskId,
    task: task
  }
  dispatch('fbAddTask', payload)
}

export function setSearch({ commit }, value) {
  commit('setSearch', value)
}

export function setSort({ commit }, value) {
  commit('setSort', value)
}

export function fbReadData({ commit }) {
  let uid = firebaseAuth.currentUser.uid
  // uid = 'w6QEOpkpE6UORs7SACcRZxPCOfc2'
  let tasks = firebaseDb.ref(`tasks/${uid}`)

  // initial check for data
  tasks.once('value', snapshot => {
    commit('setTasksDownloaded', true)
  }, error => {
    showErrorMessage(error.message)
    this.$router.replace('/auth')
  })

  // child added
  tasks.on('child_added', snapshot => {
    let id = snapshot.key
    let task = snapshot.val()
    commit('addTask', { id, task })
  })

  // child changed
  tasks.on('child_changed', snapshot => {
    let id = snapshot.key
    let updates = snapshot.val()
    commit('updateTask', { id, updates })
  })

  // child removed
  tasks.on('child_removed', snapshot => {
    let id = snapshot.key
    commit('deleteTask', id)
  })
}

export function fbAddTask({}, payload) {
  let uid = firebaseAuth.currentUser.uid
  let taskRef = firebaseDb
    .ref(`tasks/${uid}/${payload.id}`)
  taskRef.set(payload.task, error => {
    if (error) {
      showErrorMessage(error.message)
    } else {
      Notify.create({
        color: 'green-4',
        textColor: 'white',
        icon: 'check',
        message: 'Task added!',
      })
    }
  })
}

export function fbUpdateTask({}, payload) {
  let uid = firebaseAuth.currentUser.uid
  let taskRef = firebaseDb
    .ref(`tasks/${uid}/${payload.id}`)
  taskRef.update(payload.updates, error => {
    if (error) {
      showErrorMessage(error.message)
    } else {
      let keys = Object.keys(payload.updates)
      if (!(keys.includes('completed') && keys.length == 1)) {
        Notify.create({
          color: 'orange-4',
          textColor: 'white',
          icon: 'check',
          message: 'Task updated!',
        })
      }
    }
  })
}

export function fbDeleteTask({}, id) {
  let uid = firebaseAuth.currentUser.uid
  // uid = 'w6QEOpkpE6UORs7SACcRZxPCOfc2'
  let taskRef = firebaseDb
    .ref(`tasks/${uid}/${id}`)
  taskRef.remove(error => {
    if (error) {
      showErrorMessage(error.message)
    } else {
      Notify.create({
        color: 'red-4',
        textColor: 'white',
        icon: 'check',
        message: 'Task deleted!',
      })
    }
  })
}