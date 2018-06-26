/**
 * firebase が initializeApp で初期化されていないと使えない
 */

import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/storage'

export default firebase

export const attachmentsStorage = () => firebase.firebase().storage.ref('attachments')

export const articlesCollection = () => firebase.firestore().collection('articles')
export const systemCollection = () => firebase.firestore().collection('system')
