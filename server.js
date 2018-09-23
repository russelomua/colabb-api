import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import staffRouter from './routes/staff';

import CrossDomain from './routes/crossDomain'

dotenv.config();

const app = express();
const port = process.env.PORT || 5656;
// Connecting to the database
const db = mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`);

// setting body parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(CrossDomain);

// API routes
app.use('/auth', authRouter);

//app.all('/api/*', requireAuthentication)
app.use('/user', userRouter);
app.use('/api/staff', staffRouter);

// Running the server
app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
