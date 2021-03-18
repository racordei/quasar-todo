function grabTasks(state, completed) {
  let tasks = {}
  Object.keys(state.tasks).forEach(key => {
    let task = state.tasks[key]
    if (task.completed === completed) {
      let lower = task.name.toLowerCase()
      let search = state.search.toLowerCase()
      if (!search || lower.includes(search)) {
        tasks[key] = task
      }
    }
  })
  if (state.sort) {
    let sortedTasks = {}
    let keys = Object.keys(tasks)
    keys.sort((a, b) => {
      let ap = state.tasks[a][state.sort].toLowerCase()
      let bp = state.tasks[b][state.sort].toLowerCase()
      if (ap > bp) return 1
      else if (ap < bp) return -1
      else return 0
    }).forEach(key => {
      sortedTasks[key] = state.tasks[key]
    })
    tasks = sortedTasks
  }
  return tasks
}

export function tasksTodo (state) {
  return grabTasks(state, false)
}

export function tasksCompleted (state) {
  return grabTasks(state, true)
}

export function isEmptyTasks (state) {
  return !Object.keys(state.tasks).length
}
