import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({ 
    patient : { type: mongoose.Schema.Types.ObjectId, ref: 'patient', required: true },
    doctor : { type: mongoose.Schema.Types.ObjectId, ref: 'doctor', required: true },
    date : { type: Date, required: true },
    time : { type: String, required: true },
    status : { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    reason : { type: String, required: true },
    name : { type: String, required: true },
    age : { type: Number, required: true },
    email : { type: String, required: true, unique: true },
    contact : { type: String, required: true },
    address : { type: String, required: true },
    medicalHistory : { type: String, required: false },
    

})
const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
appointmentSchema.index({ doctor: 1, date: 1 });
appointmentSchema.index({ patient: 1, status: 1 });


export default appointmentModel;