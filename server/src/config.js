import dotenv from 'dotenv';
import path from 'path';
if(process.env.NODE_ENV != 'production'){
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

export default {
  jwt_secret: process.env.JWT_SECRET || 'jwt_secret_FJLK:',
  jwt_secret_email: process.env.JWT_SECRET_EMAIL || 'jwt_secret_email',
  URIDomain: process.env.NODE_ENV == 'production' ? 'https://www.mapitout.com/' : 'localhost:8080/',
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/mapitout'
  },
  sentryDSN: process.env.SentryDSN || '',
  admin: {
    list: ['amazingandyyy@gmail.com']
  },
  aws: {
    ses: {
      accessKeyId: process.env.SESAWSAccessKeyId || '',
      secretKey: process.env.SESAWSSecretKey || '',
      senderEmailAddress: 'team@mapitout.com'
    },
    s3: {
      accessKeyId: process.env.S3AWSAccessKeyId || '',
      secretKey: process.env.S3AWSSecretKey || ''
    }
  },
  version: process.env.APP_STAGE || 'closed',
  environment: process.env.NODE_ENV || 'development',
  plaid: {
    client_id: process.env.PLAID_CLIENT_ID || '',
    public_id: process.env.PLAID_PUBLIC_KEY || '',
    secret: {
      development: process.env.PLAID_DEVELOPMENT_SECRET || '',
      sandbox: process.env.PLAID_SANDBOX_SECRET || ''
    }
  }
}