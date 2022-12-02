
const { Users } = require("./users")
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let contacts = new Schema({
    name: {
        type: String
    },
    number: {
        type: Number
    },
    email: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    favorite: {
        type: Boolean
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: Users
    }
}, { collection: "userContacts" }

)

const Usercontact = mongoose.model('Usercontact', contacts);

module.exports = { Usercontact }