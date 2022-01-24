import * as cors from 'cors'
import * as dotenv from 'dotenv'
import * as express from 'express'
import * as fileUpload from 'express-fileupload'
import * as http from 'http'

import { json, urlencoded } from 'body-parser'

import { badRequestResponse } from './responses/badrequest'
import { router } from './routes'
import { sequelize } from './services/sequelize'
import { useSocket } from './services/socket'

dotenv.config()

const setup = async () => {
  await sequelize
    .authenticate()
    .then(() => console.log('Database auth ok'))
    .catch(console.log)

  await sequelize
    .sync({ alter: true, force: false, logging: false })
    .then(() => console.log('Database sync ok'))
    .catch(console.log)

  const app = express()

  app.use(cors())

  app.use((req, res, next) => {
    json()(req, res, (err) => {
      if (err) {
        console.error(err)

        return badRequestResponse(res)
      }

      next()
    })
  })

  app.use(urlencoded({ extended: true }))
  app.use(fileUpload({ debug: true, createParentPath: true }))
  app.use('/api/', router)

  const server = http.createServer(app)

  useSocket(server)

  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })
}

setup()
