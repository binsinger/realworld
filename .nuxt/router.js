import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42f2c8d0 = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _100bf405 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _1caa55fa = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _0b7070c3 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _18448f6e = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _3723ef13 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _1b8a97e0 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

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
    component: _42f2c8d0,
    children: [{
      path: "",
      component: _100bf405,
      name: "home"
    }, {
      path: "/login",
      component: _1caa55fa,
      name: "login"
    }, {
      path: "/register",
      component: _1caa55fa,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _0b7070c3,
      name: "profile"
    }, {
      path: "/settings",
      component: _18448f6e,
      name: "settings"
    }, {
      path: "/editor",
      component: _3723ef13,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _1b8a97e0,
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
