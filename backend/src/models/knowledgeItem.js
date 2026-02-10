import mongoose from 'mongoose';

const KnowledgeItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["note", "link", "insight"],
        required: true,
    },
    sourceURL: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    ai: {
        summary: String,
        autoTags: [String],
        lastProcessedAt: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true }
);
export default mongoose.model("KnowledgeItem", KnowledgeItemSchema);