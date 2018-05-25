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

const Index = () => import('~/views/Index.vue')
const Editor = () => import('~/views/Editor.vue')
const Post = () => import('~/views/Post.vue')
import NotFound from '~/views/NotFound.vue'

Raven
  .config(process.env.SENTRY_DSN)
  .addPlugin(RavenVuePlugin, Vue)
  .setTagsContext({
    environment: process.env.NODE_ENV
  })
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
        path: '/editor',
        component: Editor
      },
      {
        path: '/posts/:id',
        component: Post
      },
      {
        path: '/*',
        component: NotFound
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
