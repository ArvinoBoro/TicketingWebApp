let express = require('express');
let router = express.Router(); 

/* Read Functionality - Dev */ 

/* Update Functionality - Arvin */

/* Create Functionality - Carson */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('tickets/add',{
            title: 'Add Ticket'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newTicket = Ticket({
            "Name":req.body.Title,
            "Description":req.body.Description,
            "Priority":req.body.Priority,
            "Username":req.body.Username,
            "Date":req.body.Date
        });
        Ticket.create(newTicket).then(()=>{
            res.redirect('tickets/list');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list',{
            error:'Error on the server'
        })
    }
});

/* Delete Functionality - Carson */ 

router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Ticket.deleteOne({_id:id}).then(()=>{
            res.redirect('tickets/list')
        })
    }
    catch(error){
        console.error(err);
        res.render('tickets/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;