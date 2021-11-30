import Debug from 'debug'
// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from 'firebase-admin/app'
import {
  getFirestore,
  // , Timestamp, FieldValue,
// eslint-disable-next-line import/no-unresolved
} from 'firebase-admin/firestore'

import { FIREBASE } from '../config'

const debug = Debug('app:FirestoreDB')

class FirestoreDB {
  async connect () {
    if (!FirestoreDB.connection) {
      FirestoreDB.connection = new Promise((resolve, reject) => {
        try {
          debug('Preparing connection')
          initializeApp({
            credential: cert(FIREBASE.serviceAccount),
          })
          const db = getFirestore()
          debug('Connected to firebase')
          resolve(db)
        } catch (err) {
          reject(err)
        }
      })
    }
    return FirestoreDB.connection
  }

  async create (collection, data) {
    const db = await this.connect()
    return db.collection(collection).add(data)
  }

  async update (collection, id, data) {
    const db = await this.connect()
    return db.collection(collection).doc(id).set(data, { merge: true })
  }

  async get (collection, id) {
    const db = await this.connect()
    return db.collection(collection).doc(id).get()
  }

  async getAll (collection) {
    const db = await this.connect()
    return db.collection(collection).get()
  }
}

/**
 * @static
 * @type {Promise.<import('firebase-admin/firestore').Firestore>} connection
 */
FirestoreDB.connection = null

export default FirestoreDB
