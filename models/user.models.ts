import mongoose, { Schema} from "mongoose";

interface User{
    username: string;
    email: string;
}

const UserSchema  = new Schema<User>({
    username : {
        type : String,
        require : true,
        trim : true
    },
    email: {
        type : String,
        require : true,
        trim : true
    }
}, {timestamps : true })

const UserModel = mongoose.models.User <User> || mongoose.model('User', UserSchema);
export default UserModel;
