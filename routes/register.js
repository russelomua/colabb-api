import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'

const userRouter = express.Router();

userRouter.route('/')
  .post((req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password);

    let user = new User(req.body);
    user.save()
      .then(user => {
        const userData = { id: user._id, login: user.login, email: user.email };
        userData.token = jwt.sign(userData, config.secret, { expiresIn: config.expire });
        
        res.status(201).send(user)
      })
      .catch(err => res.status(500).send(err));
  });
	 
export default userRouter;