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

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true }
}));

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});