import Raven from 'raven-js'
import RavenVuePlugin from 'raven-js/plugins/vue'

import axios from 'axios'
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAsyncComputed from 'vue-async-computed'
import VueFire from 'vuefire'

import App from '~/App.vue'

import Index from '~/views/Index.vue'
import NotFoundComponent from '~/views/NotFoundComponent.vue'

Raven
  .config(process.env.SENTRY_DSN)
  .addPlugin(RavenVuePlugin, Vue)
  .install()

async function index () {
  const {data: firebaseAppConfig} = await axios.get('/__/firebase/init.json')
  firebase.initializeApp(firebaseAppConfig)

  Vue.use(VueFire)
  Vue.use(VueAsyncComputed)
  Vue.use(VueRouter)

  const router = new VueRouter({
    // HTML5 History Mode
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index
      },
      {
        path: '/posts/:id',
        component: Index
      },
      {
        path: '/*',
        component: NotFoundComponent
      }
    ]
  })

  /* eslint-disable no-new */
  new Vue({
    el: document.getElementById('root'),
    render: h => h(App),
    router
  })
  /* eslint-enable no-new */
}

index().catch(Raven.captureException.bind(Raven))
