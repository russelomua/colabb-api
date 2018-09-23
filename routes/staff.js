import express from 'express';
import Staff from '../models/staff';
const staffRouter = express.Router();

staffRouter.route('/')
  .get((req, res) => {
    Staff.find({}).then(staffs => res.json(staffs));  
  })
  .post((req, res) => {
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
    }) // end get Staffs/:staffId 
    .put((req,res) => {
        req.staff.title = req.body.title;
        req.staff.author = req.body.author;
        req.staff.save()
        res.json(req.staff)
    })
    .patch((req,res)=>{
        if(req.body._id){
            delete req.body._id;
        }
        for( let p in req.body ){
            req.staff[p] = req.body[p]
        }
        req.staff.save()
        res.json(req.staff)
    })//patch
    .delete((req,res)=>{
        req.staff.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })//delete
	 
export default staffRouter;