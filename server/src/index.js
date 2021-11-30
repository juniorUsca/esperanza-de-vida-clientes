import express from 'express'
// import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
// import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'

// import serviceAccount from '../smp-clientes-firebase-adminsdk-sexrs-05e9067a4d.json'

// initializeApp({
//   credential: cert(serviceAccount)
// });

// const db = getFirestore();

// const docRef = db.collection('users').doc('alovelace');

// docRef.set({
//   first: 'Adaa',
//   last: 'Lovelace',
//   born: 1815
// });

import contextHandler from './utils/middlewares/contextHandler'
import morganHandler from './utils/middlewares/morganHandler'
import notFoundHandler from './utils/middlewares/notFoundHandler'
import errorHandler from './utils/middlewares/errorHandler'

import { config } from './config'

import clientApi from './routes/client'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(contextHandler)
app.use(morganHandler)

app.use('/api/', clientApi)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.port, '0.0.0.0', () => {
  console.log(`listening http://0.0.0.0:${config.port}`)
})
