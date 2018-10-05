import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import registerRouter from './routes/register';
import userRouter from './routes/user';
import staffRouter from './routes/staff';
import { requireAuthentication } from './helpers/functions'

import CrossDomain from './routes/crossDomain'

const env = dotenv.config({path: '.env.local'});

if (env.error) {
  throw env.error
}
console.log('ENV LOADED:', env.parsed);

const app = express();
const port = process.env.PORT || 5656;
// Connecting to the database
const dbAddr = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

mongoose.set('useCreateIndex', true);
const db = mongoose.connect(dbAddr, { useNewUrlParser: true })
  .then(res => console.log("CONNECTED to MongoDB"))
  .catch((err) => console.log("CAN'T CONNECT to MongoDB"));

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(CrossDomain);

// API routes
app.use('/auth', authRouter);

app.use('/register', registerRouter);
app.all('/api/*', requireAuthentication);
app.use('/api/user', userRouter);
app.use('/api/staff', staffRouter);

// Running the server
app.listen(port, () => {
  console.log(`API RUNS ON: http://localhost:${port}`);
})

