import { LocalStorage } from "quasar"

export function setShow12HourTimeFormat({ commit, dispatch }, value) {
  commit('setShow12HourTimeFormat', value)
  dispatch('saveSettings')
}

export function setShowTasksInOneList({ commit, dispatch }, value) {
  commit('setShowTasksInOneList', value)
  dispatch('saveSettings')
}

export function getSettings({ commit }) {
  let settings = LocalStorage.getItem('settings')
  if (settings) {
    commit('setSettings', settings)
  }
}

export function saveSettings({ state }) {
  LocalStorage.set('settings', state.settings)
}