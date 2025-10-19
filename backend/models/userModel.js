import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
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
    birthdate : { 
        type: Date, 
        required: [true, 'Birthdate is required'],
        validate: {
            validator: function(value) {
                return value < new Date();
            },
            message: 'Birthdate must be in the past'
        }
    },
    age : { 
        type: Number, 
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150']
    },
    email : { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    contact : { 
        type: String, 
        required: [true, 'Contact number is required'],
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid contact number']
    },
    address : { 
        type: String, 
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [200, 'Address cannot exceed 200 characters']
    },
    medicalHistory : { 
        type: String, 
        required: false,
        trim: true,
        maxlength: [1000, 'Medical history cannot exceed 1000 characters']
    },
    role : { 
        type: String, 
        enum: {
            values: ['patient', 'doctor', 'admin'],
            message: 'Role must be either patient, doctor, or admin'
        },
        default: 'patient'
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

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;