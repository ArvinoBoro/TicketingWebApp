let express = require('express');
let router = express.Router(); 
let mongoose = require('mongoose'); 
let Ticket = require('../models/ticket_model');

router.get('/', async(req, res, next) => {
    displayName = req.user ? req.user.displayName : '';
    try {
        if(!req.user) {
            res.redirect('/users/login');
        } else {
            console.log("Ticket viewer: ", req.user.username);
            if(req.user.username == "admin") {
                TicketList = await Ticket.find();
                console.log(TicketList);
            } else {
                TicketList = await Ticket.find({"Username": req.user.username});
                console.log(TicketList); 
            }
            res.render('tickets/list',{
                title: 'Tickets',
                TicketList: TicketList
            });
        }
    }
        catch(err){
            console.error(err);
            res.render('tickets/list', {
                error: 'Error on the server'
            })
        }
});

router.get('/edit/:id', async(req, res, next) => { // Every profile or account has a specific token or ID that indicates specific privileges.
    displayName = req.user ? req.user.displayName : '';
    try {
        if(!req.user) {
            res.redirect('/users/login');
        } else if (req.user.username == "admin") {
            let id = req.params.id;
            let TicketToEdit = await Ticket.findById(id);
            console.log(TicketToEdit);
            res.render('tickets/edit', { 
                title: 'Edit Ticket',
                Ticket: TicketToEdit 
            });
            console.log("Admin editing ticket.");
            
        } else {
            let id = req.params.id;
            let TicketToEdit = await Ticket.findOne({"_id": id, "Username": req.user.username});
            console.log(TicketToEdit);
            if(TicketToEdit) {
                res.render('tickets/edit', { 
                    title: 'Edit Ticket',
                    Ticket: TicketToEdit 
                });
                console.log(req.user.username, " editing ticket.")
            } else {
                res.redirect('/');
            }
        }

    }
    catch(err) {
        console.error(err);
        next(err);
    }
})
router.post('/edit/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let updatedTicket = Ticket({
            "_id": id,
            "Title": req.body.Title,
            "Description": req.body.Description,
            "Priority": req.body.Priority
        })
        Ticket.findByIdAndUpdate(id, updatedTicket).then(() => {
            res.redirect('/tickets');
        })
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})



router.get('/add',async(req, res, next) => {
    displayName = req.user ? req.user.displayName : '';
    try {
        if(!req.user) {
            req.redirect('/users/login');
        } else {
            res.render('tickets/add', {
                title: 'Add Ticket'
            });
        }
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list', {
            error:'Error on the server'
        })
    }
});

router.post('/add', async(req, res, next) => {
    try {
        let newTicket = Ticket({
            "Title": req.body.Title,
            "Description": req.body.Description,
            "Priority": req.body.Priority,
            "Username": req.user.username,   
            "Date": new Date()  
        });
        Ticket.create(newTicket).then(() => {
            console.log("Ticket issued by:", req.user.username); 
            res.redirect('/tickets');
        });
    }
    catch(err) {
        console.error(err);
        res.render('/tickets', {
            error:'Error on the server'
        });
    }
});


router.get('/delete/:id', async(req, res, next) => {
    try {
        if(!req.user) {
            res.redirect('/users/login');
        } else if(req.user.username == "admin") {
            let id=req.params.id;
            Ticket.deleteOne({_id: id}).then(() => {
            res.redirect('/tickets')
            });
        } else { 
            let id=req.params.id;
            Ticket.deleteOne({_id: id, "Username": req.user.username}).then(() => {
                res.redirect('/tickets')
            });
        }
    }
    catch(error) {
        console.error(err);
        res.render('/tickets',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
