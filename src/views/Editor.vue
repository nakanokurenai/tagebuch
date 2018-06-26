<template>
  <loading v-if="onInitializing" />
  <div class="c root" v-else-if="!isPreviledgedUser">
    <p>
      You must be a previledged user if you want to edit.
      <input type=button @click="signin()" value="Sign in">
    </p>
  </div>
  <div class="c root" v-else>
    <form id="form">
      <div id=bodyarea>
        <textarea id="body-textarea" v-model="body" placeholder="body"></textarea>
        <post class="c preview" :post="{body}" />
      </div>
      <input type=button class="btn primary" @click="publish($event)" value="Publish it!">
    </form>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}
</style>

<style scoped>
.root {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-flow: column;
  max-width: 100%;
}

#form {
  flex: 1;
  display : flex;
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
  max-width: 50%;
  word-wrap: break-word;
  overflow: scroll;
  font: 1em/1.6 nunito;
  box-sizing: border-box;
}

#bodyarea > textarea {
  padding: 1em; /* same padding by lit */
}

.preview {
  margin: 0;
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

import Post from '~/components/Post.vue'
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
        gfm: true,
        breaks: true
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
        this.onInitializing = false
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
      this.onInitializing = false
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
    Loading,
    Post
  }
}
</script>
