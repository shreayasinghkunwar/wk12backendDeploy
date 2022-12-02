var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/ContactDb";
var url = "mongodb+srv://shreayask123:shreayask123@cluster0.jbf80lj.mongodb.net/ContactDb?retryWrites=true&w=majority ";
const mongoose = require("mongoose");

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

MongoClient.connect(url, function (err, db) {
    if (err) throw err; console.log("Database created!");
    db.close();
});

module.exports = { connection }


/* mongodb+srv://shreaya123:shreayask123@sskcluster.nndhc29.mongodb.net/?retryWrites=true&w=majority */

/* mongodb+srv://shreaya123:shreayask123@sskcluster.nndhc29.mongodb.net/ContactDb?retryWrites=true&w=majority*/