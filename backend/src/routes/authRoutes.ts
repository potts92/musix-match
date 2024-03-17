import express from 'express';
import bcrypt from 'bcryptjs';
import PasswordValidator from 'password-validator';
import User from '../models/User';
import {Details} from "../types/password-validator";
import {CustomSessionData} from "../types/session";

const router = express.Router();
const app = express();

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
        const session: CustomSessionData = req.session as CustomSessionData;
        app.set('userId', newUser._id.toString()); // Save user session

        res.status(201).send('User registered successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering new user.');
    }
});

router.post('/login', async (req, res) => {
    try {
        const session: CustomSessionData = req.session as CustomSessionData;
        const {username, password} = req.body;
        const user = await User.findOne({username});

        //use bcrypt to check if the hashed password matches the user input
        if (user && await bcrypt.compare(password, user.password)) {
            // Passwords match
            app.set('userId', user._id.toString()); // Save user session
            res.status(201).send(`Logged in successfully`);
        } else {
            // User not found or passwords don't match
            res.status(400).send('Invalid credentials.');
        }
    } catch (error) {
        res.status(500).send('Error logging in.');
    }
});

router.get('/check-session', async (req, res) => {
    try {
        const userId = app.get('userId');
        if (userId) {
            const user = await User.findById(userId);
            if (user) {
                res.status(200).send(user.username);
            } else {
                res.status(404).send('User not found.');
            }
        } else {
            res.status(200).send(false);
        }
    } catch (error) {
        res.status(500).send(`Error checking session: ${error}`);
    }
});

router.post('/logout', (req, res) => {
    try {
        req.session.destroy((error) => {
            if (error) {
                res.status(500).send('Error logging out.');
            } else {
                app.set('userId', ''); // Clear user session
                res.status(200).send('Logged out successfully.');
            }
        });
    } catch (error) {
        res.status(500).send('Error logging out.');
    }
});

export default router;