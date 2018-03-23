import netlifyIdentity from "netlify-identity-widget"

export default ({ app, router, Vue }) => {
  Vue.prototype.$auth = netlifyIdentity

  netlifyIdentity.on("init", (user) => {
    if (user) {
      router.push('input')
    } else {
      router.push('/')
    }
  })
  netlifyIdentity.on("login", (user) => {
    console.log(user.email + " just logged in!")
    netlifyIdentity.close()
    router.push('input')
  })
  netlifyIdentity.on("logout", (user) => {
    router.push('/')
  })

}
