import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2e0b1dd7 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _95184268 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _0d7f79c8 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _f93a86c8 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _7a34e790 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _223c441a = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _6a2cffe9 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2e0b1dd7,
    name: "layout",
    children: [{
      path: "",
      component: _95184268,
      name: "home"
    }, {
      path: "/login",
      component: _0d7f79c8,
      name: "login"
    }, {
      path: "/register",
      component: _0d7f79c8,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _f93a86c8,
      name: "profile"
    }, {
      path: "/settings",
      component: _7a34e790,
      name: "settings"
    }, {
      path: "/editor",
      component: _223c441a,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6a2cffe9,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  const router = new Router(routerOptions)
  const resolve = router.resolve.bind(router)

  // encodeURI(decodeURI()) ~> support both encoded and non-encoded urls
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = encodeURI(decodeURI(to))
    }
    return resolve(to, current, append)
  }

  return router
}
