import fs from 'fs'
import dotenv from 'dotenv'
import { URL } from 'url'

dotenv.config({ path: new URL('../../.env', import.meta.url).pathname })

export const config = {
  env: process.env.NODE_ENV ?? 'dev', // dev, prod, test
  port: +process.env.PORT || 8667,
}

export const FIREBASE = {
  serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT,
}
