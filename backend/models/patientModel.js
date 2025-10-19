import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({ 
    name : { type: String, required: true },
    password : { type: String, required: true },
    birthdate : { type: Date, required: true },
    age : { type: Number, required: true },
    email : { type: String, required: true, unique: true },
    contact : { type: String, required: true },
    address : { type: String, required: true },
    medicalHistory : { type: String, required: false },
    
})

const patientModel = mongoose.models.patient || mongoose.model('patient', patientSchema);

export default patientModel;