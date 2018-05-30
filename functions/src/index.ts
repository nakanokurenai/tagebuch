import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as URL from 'url'

admin.initializeApp(functions.config().firebase)
const firestore = admin.firestore()
const articlesCollection = firestore.collection('articles')

export const articles = functions.https.onRequest(async (req, res) => {
  const articlesSnapshot = await articlesCollection.orderBy('updated_at', 'desc').get()
  const articlesData: FirebaseFirestore.DocumentData[] = []
  articlesSnapshot.forEach(document => articlesData.push(
    Object.assign({
      id: document.id
    }, document.data())
  ))
  return res.set('Cache-Control', 'public, max-age=300, s-maxage=600').send({
    articles: articlesData,
    length: articlesData.length
  })
})

export const article = functions.https.onRequest(async (req,res) => {
  const url = URL.parse(req.url)
  if (!url.pathname || !url.pathname.startsWith('/api/articles/')) {
    return res.status(500).send('BAAD')
  }
  const articleID = url.pathname.split('/api/articles/')[1]
  const articleDocument = await articlesCollection.doc(articleID).get()
  if (!articleDocument.exists) return res.status(404).send('ENOENT')
  return res.send({
    article: articleDocument.data()
  })
})

export const ENOENT = functions.https.onRequest((req, res) => {
  return res.status(404).send('ENOENT')
})
