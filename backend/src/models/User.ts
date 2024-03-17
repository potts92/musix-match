import mongoose from 'mongoose';

interface User {
    name: string;
    username: string;
    country: string;
    password: string;
}

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;