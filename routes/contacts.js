var express = require('express');
var router = express.Router();

let contactsController = require('../controllers/contacts');

// Helper Function for security
function requireAuth(req, res, next)
{
    // Check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/user/signin');
    }
    next();
}

// Get Contacts
router.get('/', contactsController.contactsList);

// Edit Contacts
router.get('/edit/:id', requireAuth, contactsController.getEditItem);
router.post('/edit/:id', requireAuth, contactsController.postEditItem);

// Delete Contacts
router.get('/delete/:id', requireAuth, contactsController.deleteItem);

// Add Contact
router.get('/add', requireAuth, contactsController.getAddItem);
router.post('/add', requireAuth, contactsController.postAddItem);

module.exports = router;