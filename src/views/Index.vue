<template>
  <span>
    <p>
      <span>{{currentUser}}</span>
      <span>{{$route.params.id}}</span>
    </p>
    <ol>
      <li v-for="post in posts" :key="post.id">
        <post :post="post"></post>
      </li>
    </ol>
  </span>
</template>

<script>
import firebase from '@firebase/app'
import Raven from 'raven-js'

import Post from '~/components/Post.vue'

export default {
  data: () => ({
    posts: [
      {
        id: 1,
        title: 'ほげ',
        body: 'ふが'
      },
      {
        id: 2,
        title: 'hoge',
        body: 'huga'
      }
    ],
    credential: window.localStorage.getItem('credential')
      ? JSON.parse(window.localStorage.getItem('credential'))
      : null,
    user: null
  }),
  computed: {
    currentUser: function () {
      return this.user !== null
        ? this.user.displayName || this.user.email || this.user.uid
        : 'not logged in'
    }
  },
  beforeMount: async function () {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        Raven.setUserContext({})
        this.user = null
        return
      }
      this.user = user
      Raven.setUserContext({
        email: user.email,
        uid: user.uid
      })
    })

    if (this.credential && this.credential.accessToken) {
      try {
        await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(
            firebase.auth.GithubAuthProvider.credential(
              this.credential.accessToken
            )
          )
      } catch (e) {
        Raven.captureException(e)
        window.localStorage.removeItem('credential')
        return null
      }
    }
  },
  components: {
    Post
  },
  methods: {
    signin: function () {
      const provider = new firebase.auth.GithubAuthProvider()
      provider.setCustomParameters({
        'allow_signup': 'false'
      })
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          window.localStorage.setItem('credential', JSON.stringify(res.credential))
          this.credential = res.credential
        })
        .catch(Raven.captureException.bind(Raven))
    },
    error: function () {
      throw new Error('Artificial Error!')
    }
  }
}
</script>

<style scoped>
ol {
  padding: 0;
}
li {
  list-style-type: none;
}
p {
  color: red;
}
</style>
