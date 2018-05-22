import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import '@firebase/storage'
import axios from 'axios'

import Raven from 'raven-js'
import RavenVuePlugin from 'raven-js/plugins/vue'

import Vue from 'vue'
import VueFire from 'vuefire'
import AsyncComputed from 'vue-async-computed'
import App from './App.vue'

Raven
  .config(process.env.SENTRY_DSN)
  .addPlugin(RavenVuePlugin, Vue)
  .install()

async function index () {
  const {data: firebaseAppConfig} = await axios.get('/__/firebase/init.json')
  const app = firebase.initializeApp(firebaseAppConfig)

  Vue.use(VueFire)
  Vue.use(AsyncComputed)

  new Vue({
    el: document.getElementById('root'),
    render: h => h(App)
  })
}

index().catch(Raven.captureException.bind(Raven))
