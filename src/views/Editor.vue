<template>
  <span v-if="onInitializing">
    <h1>Editor</h1>
    <p >Loading...</p>
  </span>
  <span v-else>
    <h1>Editor</h1>
    <p v-if="currentUser">Signed in as {{currentUser}}</p>

    <form v-if="isPreviledgedUser">
      <input type=text v-model="title" placeholder="title">
      <textarea v-model="summary" placeholder="summary"></textarea>
      <textarea v-model="body" placeholder="body"></textarea>
      <input type=button @click="publish($event)" value="Publish it!">
    </form>
    <p v-else>
      You must be a previledged user if you want to edit.
      <input type=button @click="signin()" value="Sign in">
    </p>
  </span>
</template>

<script>
import firebase from '@firebase/app'
import { articlesCollection, systemCollection } from '~/firebase'
import Raven from 'raven-js'
import uuidv4 from 'uuid/v4'

import NotFoundComponent from '~/views/NotFoundComponent.vue'

export default {
  data: () => ({
    isPreviledgedUser: false,
    onInitializing: true,
    title: '',
    summary: '',
    body: '',
    user: null
  }),
  computed: {
    currentUser: function () {
      return this.user !== null
        ? this.user.displayName || this.user.email || this.user.uid
        : null
    }
  },
  async beforeMount () {
    Raven.setUserContext({})
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        Raven.setUserContext({})
        this.user = null
        this.isPreviledgedUser = false
        return
      }

      this.user = user

      try {
        await systemCollection().limit(1).get()
        this.isPreviledgedUser = true
      } catch (e) {
        console.error(e)
      }
      Raven.setUserContext({
        email: user.email,
        uid: user.uid
      })
    })

    const credential = window.localStorage.getItem('credential')
      ? JSON.parse(window.localStorage.getItem('credential'))
      : null
    if (credential && credential.accessToken) {
      try {
        await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(
            firebase.auth.GithubAuthProvider.credential(
              credential.accessToken
            )
          )
      } catch (e) {
        Raven.captureException(e)
        window.localStorage.removeItem('credential')
      }
    }

    this.onInitializing = false
  },
  methods: {
    publish: async function (event) {
      if (event) event.preventDefault()
      await articlesCollection()
        .doc(uuidv4())
        .set({
          title: this.title,
          body: this.body,
          summary: this.summary,
          created_at: new Date(),
          updated_at: new Date()
        })
      this.title = this.body = this.summary = ''
    },
    signin: async function () {
      const provider = new firebase.auth.GithubAuthProvider()
      provider.setCustomParameters({
        'allow_signup': 'false'
      })
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          window.localStorage.setItem('credential', JSON.stringify(res.credential))
        })
        .catch(Raven.captureException.bind(Raven))
    }
  }
}
</script>
