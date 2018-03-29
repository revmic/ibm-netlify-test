<template>
  <q-layout class="layout-padding">
    <q-card class="q-mt-lg">
      <h4 class="text-center q-mb-none">Enter Data</h4>
      <p class="q-body-1 text-center" style="color:gray">
        Enter some data and save it to IBM Cloudant.
      </p>

      <q-input class="q-ma-sm"
        float-label="Dollars"
        v-model="newEntry.dollars"
        type="number"
        prefix="$"
      />

      <q-input class="q-ma-sm"
        float-label="Hours"
        v-model="newEntry.hours"
        type="number"
        prefix="h"
      />

      <div class="row q-pa-md justify-center">
        <div class="text-center">
          <q-btn
            color="primary"
            @click="saveEntry"
            icon="save"
          >
            Save
          </q-btn>
        </div>
      </div>

      <q-card-separator />

      <div class="row">
        <h5 class="text-center q-ma-xs">
          Saved entries
        </h5>
        <q-spinner-pie style="position:relative; top:5px"
          v-if="loadingEntries"
          color="primary"
          :size="30"
        />
      </div>

      <table class="q-body-1">
        <tr v-for="entry in entries" :key="entry._id">
          <td>{{ entry.hours }} hours</td>
          <td> </td>
          <td>$ {{ entry.dollars }}</td>
        </tr>
      </table>
    </q-card>


    <q-card>
      <h4 class="text-center q-mb-none">Image to Text</h4>
      <p class="q-body-1 text-center" style="color:gray">
        Capture or upload images and get extracted text.
      </p>
       <q-uploader :url="url"
        float-label="Add files"
        clearable
        hide-upload-progress
        hide-upload-button
        @add="addFiles"
        :before="[
          {
            icon: 'cloud_upload'
          }
        ]"
      />
      <div class="row q-pa-md justify-center">
        <div class="text-center">
          <q-btn
            color="primary"
            @click="saveImage"
            icon="cloud_upload"
          >
            Upload
          </q-btn>
        </div>
      </div>

      <q-card-separator />

      <div class="row">
        <h5 class="text-center q-ma-xs">
          Your images
        </h5>
        <q-spinner-pie style="position:relative; top:5px"
          v-if="loadingImages"
          color="primary"
          :size="30"
        />
      </div>

      <div class="q-body-1">
        <div v-for="image in images" :key="image._id" class="q-pb-sm">
          <p><b>{{ image.filename }}</b></p>
          <p v-if="image.text" style="margin-top:-15px">{{ image.text }}</p>
          <p v-else style="margin-top:-15px; color:lightgray">No text found</p>
        </div>
      </div>
    </q-card>


    <q-card>
      <h4 class="text-center q-mb-none">Speech to Text</h4>
      <p class="q-body-1 text-center" style="color:gray">
        Record some speech and see extracted text.
      </p>

      <div class="row q-pa-md justify-center">
        <div class="text-center">
          <q-btn
            color="primary"
            @click="recordSpeech"
            icon="speaker_notes"
            disabled
          >
            Record
          </q-btn>
        </div>
      </div>

      <!-- <div v-if="images.length > 0" class="q-body-1">
        <div v-for="image in images" :key="image._id">
          <b>Image:</b> {{ image.filename }}
          <br>
          <b>Text:</b> {{ image.text }}
        </div>
      </div>
      <div v-else class="q-body-1">
        Nothing
      </div> -->

    </q-card>

  </q-layout>
</template>

<style>
</style>

<script>
var host = 'https://accounty-api.mybluemix.net'
if (process.env.NODE_ENV === 'development') {
  host = 'http://localhost:8000'
}

export default {
  data () {
    return {
      url: 'blah',

      entries: [],
      newEntry: {
        dollars: null,
        hours: null,
      },
      loadingEntries: false,

      images: [],
      newImage: null,
      loadingImages: false,

      speeches: {},
      newSpeech: null,
      loadingSpeeches: false
    }
  },
  created () {
    this.$auth.init()
    this.$axios.defaults.headers.common['Authorization'] =
      'Bearer ' + this.$user.token.access_token
    this.getEntries()
    this.getImages()
  },
  methods: {
    // ENTRY METHODS
    getEntries () {
      this.loadingEntries = true
      this.$axios.get(host + '/api/entries')
      .then((response) => {
        console.log(response)
        // console.log(response.data)
        this.entries = response.data
        if (this.entries.length > 0) {
          this.$q.notify({
            type: 'positive',
            message: 'Retrieved user entries from Cloudant'
          })
        }
        this.loadingEntries = false
      })
      .catch((error) => {
        console.error(error)
        this.$q.notify('Failed to retrieve entries. ' + error.message)
        this.loadingEntries = false
      })
    },
    saveEntry () {
      if (!this.newEntry.dollars || !this.newEntry.hours) {
        this.$q.notify('Must include both dollars and hours!')
        return
      }
      const data = {
        dollars: this.newEntry.dollars,
        hours: this.newEntry.hours
      }
      console.info(typeof(data))
      const config = {
        headers: {
          'Authorization': 'Bearer ' + this.$user.token.access_token
        }
      }
      this.$axios.post(host + '/api/entries', data, config)

      .then((response) => {
        this.$q.notify({
          type: 'positive',
          message: 'Saved entry to Cloudant'
        })
        // this.entries.push(response.data)
        this.getEntries()
        this.newEntry = {}
      })
      .catch((error) => {
        console.log(error)
        this.$q.notify('Failed to save entry. ' + error.message)
      })
    },
    // IMAGE METHODS
    async getImages () {
      this.loadingImages = true
      try {
        const r = await this.$axios.get(host + '/api/images')
        this.images = r.data
      } catch(e) {
        console.error(e)
        this.$q.notify('Failed to get images. ' + e.message)
        this.loadingImages = false
        return
      }
      if (this.images.length > 0) {
        this.$q.notify({
          type: 'positive',
          message: 'Retrieved image entries from Cloudant'
        })
      }
      this.loadingImages = false
    },
    addFiles (files) {
      console.log(files)
      this.newImage = files[0]
      console.log(this.newImage)
    },
    saveImage () {
      console.log(this.newImage)
      let data = new FormData()
      data.set('file', this.newImage)

      this.$axios({
        method: 'post',
        url: host + '/api/storage/upload',
        data: data,
        headers: {
          'Authorization': 'Bearer ' + this.$user.token.access_token
        }
      })
      .then((response) => {
        this.newImage = null
        console.log(response)
        this.$q.notify({
          type: 'positive',
          message: 'Uploaded ' + response.data.filename + ' to Cloud Storage'
        })
        this.callVision(response.data)
      })
      .catch((error) => {
        console.error(error)
        this.$q.notify('Failed to upload file. ' + error.message)
      })
    },
    async callVision (request_data) {
      console.log('calling Vision OCR')
      try {
        const r = await this.$axios.post(host + '/api/vision/ocr', request_data)
        // console.log(r)
      } catch (e) {
        console.error(e)
        this.$q.notify('OCR failed. ' + error.message)
      }

      this.$q.notify({
        type: 'positive',
        message: 'Successfully extracted text'
      })
      this.getImages()
    },
    // SPEECH METHODS
    recordSpeech () {

    },
    getSignedUrl (file) {
      this.$axios({
        method: 'post',
        url: host + '/api/storage/url',
        data: {
          object_key: file.name,
          http_method: 'GET'
        },
        headers: {
          'Authorization': 'Bearer ' + this.$user.token.access_token
        }
      })
      .then((response) => {
        // console.log(response)
        this.uploadHeaders = response.data.headers
        return response.data.url + '/' + file.name
      })
      .catch((error) => {
        console.error(error)
        return 'error'
      })
    }
  }
}
</script>
