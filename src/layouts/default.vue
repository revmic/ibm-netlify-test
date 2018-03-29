<template>
  <q-layout>
    <q-layout-header>
      <q-toolbar
        color="tertiary"
        :glossy="false"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          IBM Cloud Test
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>

        <q-btn v-if="authenticated"
          color="negative"
          @click="logout"
        >
          Logout
        </q-btn>

      </q-toolbar>
    </q-layout-header>

    <q-layout class="center">
      <router-view />
    </q-layout>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      authenticated: false
    }
  },
  created () {
    this.$auth.on("init", (user) => {
      if (user) {
        this.authenticated = true
      }
    })
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.authenticated = false
    }
  }
}
</script>

<style>
</style>
