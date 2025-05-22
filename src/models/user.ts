import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        email: { type: Schema.Types.String, required: true, unique: true },
        password: { type: Schema.Types.String, required: true },
        fullName: { type: Schema.Types.String, default: "" },
        gender: { type: Schema.Types.String, default: "" },
        age : { type: Schema.Types.String, default: "" },
        address: { type: Schema.Types.String, default: "" },
        contact: { type: Schema.Types.String, default: "" },
        
    },
    {
        timestamps: true,
    }
);


const UserModel = model("user", UserSchema);

export default UserModel;