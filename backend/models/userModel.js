import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
    name : { type: String, required: true },
    password : { type: String, required: true },
    birthdate : { type: Date, required: true },
    age : { type: Number, required: true },
    email : { type: String, required: true, unique: true },
    contact : { type: String, required: true },
    address : { type: String, required: true },
    medicalHistory : { type: String, required: false },
    role : { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' }

})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;