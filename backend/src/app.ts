import './setup';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import musicRoutes from './routes/musicRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI as string);

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json());

// Middleware to enable sessions
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});