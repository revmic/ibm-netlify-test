<template>
  <q-layout class="layout-padding">
    <q-card class="text-center q-mt-lg">
      <h3>IBM Cloud Showcase</h3>
      <div class="text-left q-pl-xl">
        <p>* <a href="https://www.netlify.com">Netflify</a> Hosting and Identity</p>
        <p>* <a href="https://www.ibm.com/cloud/cloud-foundry">IBM Cloud Foundry</a> App Service</p>
        <p>* <a href="https://www.ibm.com/cloud/cloudant">IBM Cloudant NoSQL</a></p>
        <p>* <a href="https://www.ibm.com/cloud/storage">IBM Cloud Storage</a></p>
      </div>
        <h5>Please sign up and log in.</h5>

      <q-field class="text-center q-pb-lg">
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
    console.log(localStorage)
  },
  methods: {
    login () {
      console.log('clicked login')
      this.$auth.open("login")
    }
  }
}
</script>
