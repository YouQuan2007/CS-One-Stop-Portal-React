// import mongoose from "mongoose";

// const VisitsSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
//     timestamps:{createdAt:'created_at',updatedAt:'updated_at'},
//     counter:{
//         type: Number,
//         required: true, 
//         default: 0},
// } 

// // {
// //     collection: "Visits",
// );

// const VisitsModel = mongoose.model("Visits", VisitsSchema);

// export { VisitsModel as Visits }

import mongoose from "mongoose";

const VisitsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    timestamps: {
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
    },
    counter:{
        type: Number,
        required: true, 
        default: 0},
});

const VisitsModel = mongoose.model("Visits", VisitsSchema);

export { VisitsModel as Visits }
