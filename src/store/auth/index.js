import { firebaseAuth } from "boot/firebase";
import { LocalStorage, Loading } from "quasar";
import { showErrorMessage, showLoading } from "src/functions/function-show-message";

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({}, payload) {
    showLoading(`Registering <b>${payload.email}</b> in progress.<br/>`
        + `<span class="text-orange text-weight-bold">Hang on...</span>`)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      // .then(response => {})
      .catch(function(error) {
        showErrorMessage(error.message)
      })
  },
  loginUser({}, payload) {    
    showLoading(`Loading <b>${payload.email}</b> in progress.<br/>`
        + `<span class="text-orange text-weight-bold">Hang on...</span>`)
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      // .then(response => {})
      .catch(function(error) {
        showErrorMessage(error.message)
      })
  },
  logoutUser({}) {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        const payload = null
        const options = {
          root: true // allows calls from diferente store modules
        }
        dispatch('tasks/fbReadData', payload, options)
      } else {
        commit('tasks/clearTasks', null, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => {})
        commit('tasks/setTasksDownloaded', false, { root: true })
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
