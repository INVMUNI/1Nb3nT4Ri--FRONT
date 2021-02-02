import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import multiguard from 'vue-router-multiguard' //Middelware
import goTo from 'vuetify/es5/services/goto'

import Default from '@/components/Default'
import Login from '@/components/login/Index'
import Prueba from '@/components/Prueba'

Vue.use(Router)

//validar authenticacion
const isLoggedIn = (to, from, next) => {
  var user = store.state.usuario
  if (!_.isEmpty(user)) {}
  return store.state.is_login ? next() : next('/login')
}

const isLoggedOut = (to, from, next) => {
  return store.state.is_login ? next('/') : next()
}

const permissionsValidations = (to, from, next) => {
  var permissions = store.state.permissions
  var ruta = to.path.split('/').join('')
  var perm = _.includes(permissions, ruta)
  return perm ? next() : next('/')
}

const routes = [{
    path: '/',
    name: 'Default',
    component: Default,
    beforeEnter: multiguard([isLoggedIn])
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: multiguard([isLoggedOut])
  },
  {
    path: '/default',
    name: 'Prueba',
    component: Prueba,
    beforeEnter: multiguard([isLoggedOut])
  }
]

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes
})
