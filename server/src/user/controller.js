import AWS from 'aws-sdk';

import bcrypt from 'bcrypt-nodejs';
import Email from './email';
import User from './model';
import config from '../config';
import JWT from './jwt';
import uuid from './uuid';

export default {
  signupWithEmail: (req, res, next) => {
    const { email } = req.body;
    (!email)? next('You Must Provide Email.'):
      User.findOne({
        email: email
      }).then(user => {
        if (user) return next('403:Email is in use.');
        const { origin } = req.headers;
        const tokenn = JWT.generateTokenWithEmail(email);
        const deepLink = `${origin}/#signupVerification?token=${tokenn}&address=${email}`;
        const mailObj = {
          to: email,
          subject: '[mapitout]Welcome and Account Activation.',
          message: (config.version=='public' || config.version=='internal')?activationEmailTemplate(deepLink):accessRequestEmailTemplate(deepLink)
        };
        if(config.ses_to_verify){
          Email.send(mailObj).then(email=>{
            res.send({email});
          }).catch((err)=>{
            console.log(err);
            next('500:Email is bad.')
          });
        }else{
          res.send({ deepLink })
        }
      }).catch(next);
  },
  verifyEmailToken: (req, res, next) => {
    JWT.verifyEmailToken(req.body.token, (err, address) => {
      if (err) return res.sendStatus(401);
      res.send(address);
    })
  },
  signup: (req, res, next) => {
    const { email, password, firstName, lastName, avatar } = req.body;
    JWT.verifyEmailToken(req.params.token, (err, address) => {
      if (err || (address !== email) || (!email || !password)) return res.sendStatus(401);
      User
        .findOne({ email })
        .then(existingUser => {
          if (existingUser) return next('422:Email is in use');
          bcrypt.genSalt(10, (error, salt) => {
            if (error) return next(error);
            bcrypt.hash(password, salt, null, (err, crypt) => {
              if (err) return next(err);
              const newUser = new User({
                name: {
                  first: firstName,
                  last: lastName
                },
                email,
                password: crypt,
                avatar
              })
              return newUser.save()
            })
          })
        })
        .then(savedUser => {
          return res.send({
            token: JWT.generateToken(savedUser), 
            isAdmin: (config.admin.list.indexOf(savedUser.email)!=-1),
            status: true
          })
        })
        .catch(next);
    })
  },

  signin: (req, res, next) => {
    const { email, password } = req.body;
    (!email || !password)?next('You Must Provide Email And Password'):
      User.findOne({ email })
        .then(user => {
          if(!user)return next('404:User Is Not Found');
          user.comparedPassword(password, (err, good) => {
            (err || !good)?next(err || '403:Password Is Incorrect'):
              res.send({token: JWT.generateToken(user), isAdmin: (config.admin.list.indexOf(user.email)!=-1)});
          })
        }).catch(next)
  },

  updateProfile: (req, res, next) => {
    req.user.comparedPassword(req.body.password, (err, good) => {
      if (err) return next(err);
      if (!good) return next('401:Incorrect Password');
      
      const userId = req.user._id;
      const newProfile = {
        name: {
          first: req.body.firstName,
          last: req.body.lastName
        },
        venmoId: req.body.venmoId || null
      };
      User.findByIdAndUpdate(userId, newProfile, { new: true })
        .then(newUser => res.sendStatus(200))
        .catch(next)
    })
  },

  updateProfileAvatar: (req, res, next) => {
    const file = req.file;
    const userId = req.user._id;
    if(!file) return next('500:image bad');
    const fieldname = file.fieldname;
    let filenameParts = file.originalname.split('.');
    let ext;
    if (filenameParts.length > 1) {
      ext = "." + filenameParts.pop();
    } else {
      ext = '';
    }

    const AWS_KEY_ID = config.aws.s3.accessKeyId;
    const AWS_SECRET = config.aws.s3.secretKey;

    const uuidKey = `${config.environment}/users/${userId}/${fieldname}/${uuid()}${ext}`;
    AWS.config.update({
      accessKeyId: AWS_KEY_ID,
      secretAccessKey: AWS_SECRET,
      subregion: 'us-west-1'
    });
    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: 'mapitout',
      Key: uuidKey, 
      Body: file.buffer,
      ACL: 'public-read'
    }, (err, result) => {
      const avatarURL = `https://mapitout.s3.amazonaws.com/${uuidKey}`
      if (err) return next('500:Uploading Photo Failed');
      User.findByIdAndUpdate(userId, { $set:{avatar: avatarURL} }, { new: true })
        .then(res=> res.sendStatus(200))
        .catch(next)
    })
  }
}

const accessRequestEmailTemplate = (deepLink) => {
  return `<b>Welcome to mapitout</b>
  <br/>
  You are in line to Beta Access!
  <br/>
  Please feel free to reply this email or reach out to us via team@mapitout.com anytime.
  <br/>
  <br/>
  Regards,
  <br/>
  <b>The mapitout team</b>
  `
}

const activationEmailTemplate = (deepLink) => {
  return `<b>Welcome to mapitout,</b>
  <br/>
  <br/>
  If you requested this activation, please go to the following Link to verify this email,
  <br/>
  <br/>
  <a href='${deepLink}' target='_blank'>${deepLink}</a>
  <br/>
  <br/>
  Please feel free to reply this email or reach out to us via team@mapitout.com anytime.
  <br/>
  <br/>
  <br/>
  Regards,
  <br/>
  <b>The mapitout Pocket team</b>
  `
}