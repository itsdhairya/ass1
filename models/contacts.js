// Import
let mongoose = require('mongoose');

// Create model class
let contactsModel = mongoose.Schema(
    {
        name: String,
        phone: String,
        email: String,
    },
    {
        collection: "items"
    }
);

module.exports = mongoose.model("Contact", contactsModel);