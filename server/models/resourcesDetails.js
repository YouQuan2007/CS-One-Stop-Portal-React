import mongoose from "mongoose";

const ResourcesDetailsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    title: { type: String, required: true },
    file: { type: String, required: true },
    uploadedDate: { type: Date, default: Date.now },
    permittedUsers: [String] // List of user emails or IDs
    //description: { type: String, required: true },
},
{
    collection: "resourcesDetails",
});

const ResourcesModel = mongoose.model("Resources", ResourcesDetailsSchema);

export { ResourcesModel as Resources }