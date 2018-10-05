import express from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config'

const authRouter = express.Router();

authRouter.route('/')
  //do auth
  .post((req, res) => {
    User.findOne({login: req.body.login})
      .then(user => {
        if (!user) return res.status(404).send('No user found.');
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
        const userData = { id: user._id, login: user.login, email: user.email };
        userData.token = jwt.sign(userData, config.secret, { expiresIn: config.expire });
        
        res.status(200).send(userData);
      })
      .catch(err => res.status(500))
  })
  //check auth status
  .get((req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, (err, user) => {
      if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
      
      const userData = { id: user._id, login: user.login, email: user.email, token: token };
      
      res.status(200).send(userData);
    });
  })

export default authRouter;