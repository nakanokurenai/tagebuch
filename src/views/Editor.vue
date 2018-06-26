<template>
  <loading v-if="onInitializing" />
  <div class="c" v-else>
    <span v-if="isPreviledgedUser">
      <form id="form">
        <input type=text id=title v-model="title" placeholder="title">
        <input type=text id=summary v-model="summary" placeholder="summary">
        <div id=bodyarea>
          <textarea id="body-textarea" v-model="body" placeholder="body"></textarea>
          <div v-html="renderedBody"></div>
        </div>
        <input type=button @click="publish($event)" value="Publish it!">
      </form>
      <div id="editor">
      </div>
    </span>
    <p v-else>
      You must be a previledged user if you want to edit.
      <input type=button @click="signin()" value="Sign in">
    </p>
  </div>
</template>

<style>
html, body, #form {
  height: 100%;
}

#form {
  display : inline-flex;
  flex-flow: column;
  width: 100%;
}

#bodyarea {
  display: flex;
  flex-flow: row;
  flex: 1 auto;
}

#bodyarea > * {
  flex-grow: 1;
  min-width: 50%;
  word-wrap: break-word;
  overflow: scroll;
}

#textarea {
  height: 100%;
}

* {
  border: 0px;
}
</style>

<script>
import { default as firebase, articlesCollection, systemCollection } from '~/firebase'
import '@firebase/auth'
import Raven from 'raven-js'
import uuidv4 from 'uuid/v4'
import marked from 'marked'

import Loading from '~/components/Loading.vue'

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
    },
    renderedBody: function () {
      return marked(this.body, {
        sanitize: true
      })
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
          created_at: new Date(), // eslint-disable-line camelcase
          updated_at: new Date() // eslint-disable-line camelcase
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
  },
  components: {
    Loading
  }
}
</script>
