import axios from 'axios'

export default ({ Vue }) => {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

  Vue.prototype.$axios = axios
}
