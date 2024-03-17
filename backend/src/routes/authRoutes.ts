import express from 'express';
import bcrypt from 'bcryptjs';
import PasswordValidator from 'password-validator';
import User from '../models/User';
import {Details} from "../types/password-validator";

const router = express.Router();

//define password validation schema
const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8)
    .has().letters()
    .has().digits()
    .has().not().spaces()
    .has().symbols();

router.post('/register', async (req, res) => {
    try {
        const {name, username, country, password} = req.body;

        // Validate user input
        if (!name || !username || !country || !password) {
            return res.status(400).send('Please fill in all fields.');
        } else if (!passwordSchema.validate(password)) {
            const details = passwordSchema.validate(password, {details: true}) as Details;
            return res.status(400).send(`Password is invalid:\n${details.map(detail => `\n${detail.message}`).join('')}`);
        } else if (name.length < 2) {
            return res.status(400).send('Name must be at least 2 characters long.');
        } else if (username.length < 4) {
            return res.status(400).send('Username must be at least 4 characters long.');
        } else if (await User.findOne({username})) {
            return res.status(400).send('Username already exists.');
        }

        // Hash the password and save the user to MongoDB
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            username,
            country,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        // Get the user by username from MongoDB
        const user = await User.findOne({username});

        //todo: are user.password and password both hashed?
        if (user && await bcrypt.compare(password, user.password)) {
            // Passwords match
            //todo: should req.session.userId be req.session.id?
            // req.session.userId = user._id; // Save user session
            // res.send('Logged in successfully.');
            res.status(201).send('Logged in successfully.');
        } else {
            // User not found or passwords don't match
            res.status(400).send('Invalid credentials.');
        }
    } catch (error) {
        res.status(500).send('Error logging in.');
    }
});

export default router;