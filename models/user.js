import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const userModel = new Schema({
  login: { 
    type: String,
    unique: true,
    match: /[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*/
  },
  password: { 
    type: String
  },
  email: { 
    type: String,
    unique: true,
    match: /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/
  }
});
export default mongoose.model('users', userModel)