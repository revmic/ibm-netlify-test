import netlifyIdentity from "netlify-identity-widget"

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = netlifyIdentity

  netlifyIdentity.on("init", (user) => {
    console.log('netlifyIdentify on init fired')
    if (user) {
      // console.log(user.token.access_token)
      Vue.prototype.$user = user
      router.push('input')
    } else {
      router.push('/')
      Vue.prototype.$user = null
    }
  })
  netlifyIdentity.on("login", (user) => {
    // console.log(user.email + " logged in!")
    netlifyIdentity.close()
    router.push('input')
  })
  netlifyIdentity.on("logout", (user) => {
    router.push('/')
  })

}
