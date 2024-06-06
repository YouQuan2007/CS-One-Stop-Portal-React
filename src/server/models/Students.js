import mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String, default:"Students"}
});

const StudentsModel = mongoose.model("Students", StudentsSchema);

export { StudentsModel as Students }