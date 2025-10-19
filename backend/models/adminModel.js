import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({ 
    id : { 
        type: String, 
        required: [true, 'Admin ID is required'],
        unique: true,
        trim: true,
        uppercase: true
    },
    name : { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    password : { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    email : { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    role: { 
        type: String, 
        default: "admin",
        enum: {
            values: ['admin'],
            message: 'Admin role must be admin'
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
})

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel;