import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 80 },
        text: { type: String, required: true, trim: true, maxlength: 2000 },
        rating: { type: Number, min: 1, max: 5, default: 5 },
        // можно расширить: orderId, email, etc.
        status: { type: String, enum: ['published', 'pending'], default: 'published' }
    },
    { timestamps: true }
);

export default mongoose.model('Review', ReviewSchema);
