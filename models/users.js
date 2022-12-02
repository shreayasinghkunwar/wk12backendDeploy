const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }


}, { collection: "Users" }

)

const Users = mongoose.model('Users', user);

module.exports = { Users }