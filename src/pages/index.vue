<template>
  <q-layout>
    <q-card class="text-center">
      <h3>Please log in.</h3>

      <q-field class="q-pt-lg text-center">
        <q-btn
          color="primary"
          @click="login"
        >
          Login
        </q-btn>
      </q-field>
    </q-card>

  </q-layout>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
    }
  },
  beforeCreate () {
    this.$auth.init()
  },
  methods: {
    login () {
      console.log('clicked login')
      this.$auth.open("login")
    }
  }
}
</script>
