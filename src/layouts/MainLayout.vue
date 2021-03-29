<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>

        <q-btn
          flat
          to="/auth"
          v-if="!loggedIn"
          icon-right="account_circle"
          label="Login"
          class="absolute-right" />

        <q-btn
          flat
          @click="logoutUser"
          v-else
          icon-right="account_circle"
          label="Logout"
          class="absolute-right" />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="drawer"
      :breakpoint="767 + 16"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header> Navigation </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          exact
          class="text-gray-4"
          clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="$q.platform.is.electron"
          @click="exitApp"
          class="text-gray-4 absolute-bottom"
          clickable>
          <q-item-section avatar>
            <q-icon name="power_settings_new" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Exit</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "MainLayout",
  data() {
    return {
      drawer: this.$q.platform.is.desktop,
      // drawer: false,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    exitApp() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really exit the app?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        require('electron').ipcRenderer.send('exit-app')
      })
    }
  },
}
</script>

<style lang="scss">
  @media screen and (min-width: 767px) {
    .q-footer {
      display: none;
    }
  }

  .q-drawer {
    .q-router-link--exact-active {
      color: white !important;
    }
  }
</style>