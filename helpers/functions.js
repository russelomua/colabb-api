import jwt from 'jsonwebtoken';
import config from '../config'

export const requireAuthentication = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, (err, user) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    next()
  });
}