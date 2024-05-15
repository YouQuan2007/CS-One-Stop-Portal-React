import mongoose from "mongoose";

const LecturersSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String, default:"Lecturers"}
});

const LecturersModel = mongoose.model("Lecturers", LecturersSchema);

export { LecturersModel as Lecturers }