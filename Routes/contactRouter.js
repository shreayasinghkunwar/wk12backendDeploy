const express = require("express");
const router = express.Router();

const { Users } = require("../models/users");
const { Usercontact } = require("../models/contacts");
const app = express();
const jwt = require("jsonwebtoken");
const jwt_Secret = "abccgghhh";





router.post('/signin', async (req, res) => {
    console.log(req.body);
    const { name, username, password } = req.body

    try {
        if (!name || !username || !password) {
            res.status(404).json({ message: "Please fill all data" });
            //  alert("Please fill all data");
        }
        const existingUser = await Users.findOne({ username: username });
        console.log(existingUser);

        if (existingUser) {
            res.status(404).json({ message: "This username is already available" });
        } else {
            const addUsers = new Users(req.body);
            console.log("acti", addUsers);
            const insertContact = await addUsers.save();
            res.send(insertContact);
            console.log(insertContact);

        }


    }
    catch (error) {
        res.status(404).json(error);
    }
})


//login

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body

        const user = await Users.findOne({ username: username });
        if (!user) {
            res.status(404).json({ message: " User not found " })
        }
        if (password === user.password) {
            const token = jwt.sign({ username: user.username }, jwt_Secret);

            if (res.status(201)) {
                res.json({ status: "ok", data: token })
            } else {
                res.status(404).json({ message: "error" })
            }
        } else {
            res.status(404).json({ message: "Invalid password" })
        }
    } catch (error) {
        res.status(404).json(error);
    }

})


//getuserdata

router.post("/user", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, jwt_Secret);
        const username = user.username
        const userData = await Users.findOne({ username: username });
        const contactsData = await Usercontact.find({ userid: userData._id })
        res.json({ data: contactsData, user: userData.name });

    }
    catch (error) {
        res.status(404).json(error);
    }
});


//Add new contact of users

router.post('/register', async (req, res) => {
    console.log('token', req.body.token);
    const { name, number, email, description, token } = req.body

    if (!name || !email || !number) {
        res.status(404).json({ message: "Please fill all data" });
        alert("Please fill all data");
    }

    try {
        const user = jwt.verify(token, jwt_Secret);
        const username = user.username
        const userData = await Users.findOne({ username: username });
        console.log("idd", userData._id);
        const existingUser = await Usercontact.findOne({ userid: userData._id, number: number });
        console.log(existingUser);

        if (existingUser) {
            res.status(404).json({ message: "This contact is already available" });
        } else {
            const addContact = new Usercontact({
                name: name,
                number: number,
                email: email,
                description: description,
                userid: userData._id
            });
            console.log("acti", addContact);
            const insertContact = await addContact.save();
            res.send(insertContact);
            console.log(insertContact);

        }


    }
    catch (error) {
        res.status(404).json(error);
    }
})


//edit contacts
router.patch("/edit/:id", async (req, res) => {
    try {
        console.log('id', req.params.id)
        const id = req.params.id;
        console.log("resbody", req.body)
        const updatedData = await Usercontact.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log('update', updatedData);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(404).json(error);
    }
})


router.delete("/delete/:id", async (req, res) => {
    try {
        console.log('id', req.params.id)
        const id = req.params.id;
        console.log("resbody", req.body)
        const deletedData = await Usercontact.findByIdAndDelete({ _id: id });

        console.log('update', deletedData);
        res.status(200).json(deletedData);
    } catch (error) {
        res.status(404).json(error);
    }


})


//view a contact
router.get("/view/:id", async (req, res) => {
    try {
        const id = req.params.id;
        console.log('id', id);
        const ContactIdInfo = await Usercontact.findOne({ _id: id })
        console.log(ContactIdInfo);
        res.status(200).json({
            data: ContactIdInfo
        })
    } catch (error) {
        res.status(404).json({ message: "Error" });
    }

})

// view favorite list
router.post("/favorite", async (req, res) => {
    try {

        const { token } = req.body
        const user = jwt.verify(token, jwt_Secret);
        const username = user.username
        const userData = await Users.findOne({ username: username });

        const contactData = await Usercontact.find({ userid: userData._id, favorite: true });
        const strigified = JSON.stringify(contactData);
        res.json({ data: contactData });
        console.log('datas', contactData);

    } catch (error) {
        res.status(404).json(error);
    }
})

//seacrh by name

router.post("/search/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const { token } = req.body
        console.log('name', name);

        const user = jwt.verify(token, jwt_Secret);
        const username = user.username
        const userData = await Users.findOne({ username: username });

        const contactNameInfo = await Usercontact.find({ userid: userData._id, name: name })
        console.log(contactNameInfo);
        
        res.status(200).json({
            data: contactNameInfo
        })
    } catch (error) {
        res.status(404).json({ message: "Error" });
    }

});

module.exports = router;
