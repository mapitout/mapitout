import AWS from 'aws-sdk';
import config from '../config';

const s3 = new AWS.S3();

const AWS_KEY_ID = config.aws.S3AWSAccessKeyId;
const AWS_SECRET = config.aws.S3AWSSecretKey;

AWS.config.update({
  accessKeyId: AWS_KEY_ID,
  secretAccessKey: AWS_SECRET,
  subregion: 'us-west-1'
});

export default s3;
