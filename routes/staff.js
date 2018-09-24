import express from 'express';
import Staff from '../models/staff';
const staffRouter = express.Router();

staffRouter.route('/')
  .get((req, res) => {
    Staff.find({}).then(staffs => res.status(200).json(staffs));  
  })
  .post((req, res) => {
    if(typeof req.body._id !== "undefined")
      delete req.body._id;
    
    let staff = new Staff(req.body);
    staff.save()
      .then(staff => res.status(201).send(staff))
      .catch(err => res.status(500).send(err))
  })

// Middleware 
staffRouter.use('/:staffId', (req, res, next)=>{
    Staff.findById( req.params.staffId, (err,staff)=>{
        if(err)
            res.status(500).send(err)
        else {
            req.staff = staff;
            next()
        }
    })

})
staffRouter.route('/:staffId')
    .get((req, res) => {
        res.json(req.staff)
    })
    .post((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.staff[p] = req.body[p]
        }
        req.staff.save()
          .then(staff => res.status(200).send(staff) )
          .catch(err => res.status(500).send(err))
    })
    .delete((req,res)=>{
        req.staff.remove()
          .then(() => res.status(204).send('removed')) 
          .catch(err => res.status(500).send(err))
    })
	 
export default staffRouter;