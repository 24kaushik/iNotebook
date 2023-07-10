const express = require('express');
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "thisismy$ecret"


//Route 1: Create a user using: POST "api/auth/". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters!').isLength({ min: 5 }),


], async (req, res) => {
    let success = false
    //if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'sorry a user with this email already exists' })
        }
        //securing the password by hashing and adding salt
        let salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        //Making a token from userID
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})



//Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    let success = false
    //if there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //finding the user in the database (if exists) and sending authToken.
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        //Making a token from userID
        const data = {
            user: { id: user.id }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success= true
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error!");
    }
})

// Route 3: Get the details of a logged in user using: POST "/api/auth/getuser". Login required!
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = router