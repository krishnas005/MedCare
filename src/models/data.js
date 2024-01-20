import mongoose from 'mongoose';


const DataSchema = new mongoose.Schema({
    DOB: Date,
    chronicDiseases: String,
    allergies: String,
    medications: String,
    height: Number,
    weight: Number
},
    {
        timestamps: true
    })

const Data = mongoose.models.Datas || mongoose.model("Datas", DataSchema);

export default Data;