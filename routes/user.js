import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'

const userRouter = express.Router();

// Middleware 
userRouter.use('/', (req, res, next)=>{
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, (err, userToken) => {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

    User.findById( userToken._id, (err,userdb)=>{
      if(err)
        res.status(500).send(err)
      else {
        req.user = userdb;
        next()
      }
    })
  });
})
userRouter.route('/')
    .get((req, res) => {
        res.json(req.user)
    })
    .post((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.user[p] = req.body[p]
        }
        req.user.save()
          .then(user => res.status(200).send(user) )
          .catch(err => res.status(500).send(err))
    })
    .delete((req,res)=>{
        req.user.remove()
          .then(() => res.status(204).send('removed')) 
          .catch(err => res.status(500).send(err))
    })
	 
export default userRouter;