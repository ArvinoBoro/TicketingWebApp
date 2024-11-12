let express = require('express');
let router = express.Router(); 
let mongoose = require('mongoose'); 
let Ticket = require('../models/ticket_model');

/* Read Functionality - Dev */ 
router.get('/view/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        // Fetch the ticket by its ID
        const ticket = await Ticket.findById(id);  
        
        // If the ticket is found, render the view page and pass the ticket data
        if (ticket) {
            res.render('tickets/view', {
                title: `View Ticket - ${ticket.Title}`,
                ticket: ticket  // Pass the ticket details to the view
            });
        } else {
            res.status(404).send('Ticket not found');
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* Update Functionality - Arvin */
router.get('/edit/:id', async(req, res, next) => { // Every profile or account has a specific token or ID that indicates specific privileges.
    try {
        const id = req.params.id;
        console.log(id);
        const TicketToEdit = await Ticket.findById(id); // Mongoose query
        res.render('tickets/edit', { 
            title: 'Edit Ticket',
            ticket: TicketToEdit // Send the document with the requested ID.
        })
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
            "Tile": req.body.Title,
            "Description": req.body.Description,
            "Priority": req.body.Priority
        })
        Book.findByIdAndUpdate(id, updatedTicket).then(() => {
            res.redirect('/list');
        })
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})



/* Create Functionality - Carson */
router.get('/add',async(req, res, next) => {
    try {
        res.render('tickets/add', {
            title: 'Add Ticket'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list', {
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async(req, res, next) => {
    try {
        let newTicket = Ticket({
            "Title": req.body.Title,
            "Description": req.body.Description,
            "Priority": req.body.Priority,
            "Username": "admin",    // User routes are yet to be configured
            "Date": new Date()  // [1] Creates a date object representing current Unix time. 
        });
        Ticket.create(newTicket).then(() => {
            res.redirect('tickets/list');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list', {
            error:'Error on the server'
        })
    }
});

/* Delete Functionality - Carson */ 

router.get('/delete/:id', async(req, res, next) => {
    try {
        let id=req.params.id;
        Ticket.deleteOne({_id:id}).then(() => {
            res.redirect('tickets/list')
        })
    }
    catch(error) {
        console.error(err);
        res.render('tickets/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
