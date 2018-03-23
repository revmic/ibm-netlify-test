<template>
  <q-layout>
    <q-card>
      <h3 class="text-center">Enter some data!</h3>
      <q-input
        float-label="Dollars"
        :value="dollars"
        prefix="$"
      />

      <q-input class="q-mt-lg"
        float-label="Hours"
        prefix="h"
        :value="hours"
      />

      <input type="file" class="q-pt-lg" />

      <div class="row q-pa-lg">
        <div class="center">
          <q-btn
            color="primary"
            @click="save"
          >
            Save
          </q-btn>

          <q-btn
            color="negative"
            @click="logout"
          >
            Logout
          </q-btn>
        </div>
      </div>

    </q-card>

  </q-layout>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      dollars: null,
      hours: null
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
    this.$auth.init()
  },
  methods: {
    logout () {
      this.$auth.logout()
    },
    save () {
      console.log('save')
    }
  }
}
</script>
