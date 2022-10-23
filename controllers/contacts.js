// Create a reference to the model
let ContactsModel = require('../models/contacts');

// Returns All Contacts
module.exports.contactsList = function(req, res, next) {
    ContactsModel.find({}).sort('name').exec( (err, contactsList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('contacts/contacts', {
                title: "Business Contacts",
                ContactsList: contactsList,
                userName: req.user ? req.user.username : '' 
            });
        }
    })
};

// Returns Item to be Edited
module.exports.getEditItem = function(req, res, next) {
    let id = req.params.id;

    ContactsModel.findById(id, (err, itemToEdit) => {
        if (err) {
            res.end(err);
        }
        else {
            res.render('contacts/form', {
                title: "Edit Item",
                item: itemToEdit,
                userName: req.user ? req.user.username : '' 
            });
        }
    })
};

// Posts Edited Item to Database
module.exports.postEditItem = function(req, res, next) {
    let id = req.params.id;

    let updatedItem = ContactsModel({
        _id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    });

    ContactsModel.updateOne({_id: id}, updatedItem, (err) => {
        if (err) {
            res.end(err);
        }
        else {
            res.redirect('/contacts/');
        }
    })
};

// Removes Item from Database
module.exports.deleteItem = (req, res, next) => {
    let id = req.params.id;

    ContactsModel.remove({_id: id}, (err) => {
        if(err)
        {
            res.end(err);
        }
        else
        {
            res.redirect('/contacts');
        }
    });
}

// Create New Item to be Added
module.exports.getAddItem = (req, res, next) => {
    let newItem = ContactsModel();

    res.render('contacts/form', {
        title: 'Add a New Item',
        item: newItem,
        userName: req.user ? req.user.username : '' 
    })          
}

// Post New Item
module.exports.postAddItem = (req, res, next) => {

    let newItem = ContactsModel({
        _id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    ContactsModel.create(newItem, (err, item) =>{
        if(err) {
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
}

