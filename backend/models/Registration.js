import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema(
    {
        eventTitle: { type: String, required: true },
        date: { type: String },      // "18 октября"
        time: { type: String },      // "11:30"
        place: { type: String },     // "Библиотека ..."
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },     // необязателен
        requiresRegistration: { type: Boolean, default: false },
        status: { type: String, enum: ['new', 'confirmed'], default: 'new' }
    },
    { timestamps: true }
);

export default mongoose.model('Registration', RegistrationSchema);
