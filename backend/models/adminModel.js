import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({ 
    id : { type: String, required: true, unique: true },
    name : { type: String, required: true },
    password : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    role: { type: String, default: "admin" },


})

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;