const express = require('express');
const router = express.Router();
const UsersSchema = require('../models/Users');
const bcrypt = require('bcryptjs');

// GET all users
router.get('/', async (req, res) => {
  try {
    // res.send("Nigga bhai");
    const Users = await UsersSchema.find();
    res.json(Users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

// Adding a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new UsersSchema(req.body);
    console.log(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(401).json({ error: err.message || 'Failed to create new User' });
  }
});

router.post('/login', async (req, res) =>{
    try{
        const { email, pass } = req.body;
        const user = await UsersSchema.findOne({ email });

        const hashedPass = user.pass;

        const isMatch = await bcrypt.compare(pass, hashedPass);

        if(isMatch){
            res.status(201).json(user);
        }
        else{
            res.status(401).json("faillllll");
        }


        console.log(req.body);
    }
    catch (err){
        console.log(err.message);
    }
})

module.exports = router;
