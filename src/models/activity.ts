import { Schema, model } from "mongoose";

const activitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        enum: ["pending", "in-progress", "completed"],
        required: true,
    },
    dueDate: {
        type: Schema.Types.Date,
    },
    isDeleted: {
        type: Schema.Types.Boolean,
        default: false
    }
},
    {
        timestamps: true,
    }
);
const ActivityModel = model("Activity", activitySchema);
export default ActivityModel;
