/* Ticket Schema - Arvin */

let mongoose = require('mongoose') // Import MongoDB API for JS
console.log("Mongoose Imported")

let ticketModel = mongoose.Schema({ // Define the ticket model
    Title: String,
    Description: String,
    Priority: String, 
    Username: String, 
    Date: Date, 
}, 
{
    collection: "tickets" 
});

module.exports = mongoose.model('Ticket', ticketModel); // Export the book schema as 'Ticket'