import * as SequelizeModels from './sequelize'

declare global {
  namespace Express {
    interface Request {
      user: SequelizeModels.UserAttributes
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      SECRET: string
      DATABASE_URL: string
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      S3_BUCKET_NAME: string
    }
  }
}

export { SequelizeModels }
