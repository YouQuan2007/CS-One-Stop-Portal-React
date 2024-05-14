import mongoose from "mongoose";

const CompetitionDetailsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    title: { type: String, required: true },
    file:{ type: String, required: true },
    description: { type: String, required: true },
    uploadedDate: { type: Date, default: Date.now },
    //description: { type: String, required: true },
},
{
    collection: "competitionDetails",
});

const CompetitionModel = mongoose.model("Competition", CompetitionDetailsSchema);

export { CompetitionModel as Competition }