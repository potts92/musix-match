import mongoose from 'mongoose';
import {User} from "@musixmatch/shared/types/users";

const userSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    password: { type: String, required: true }
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;