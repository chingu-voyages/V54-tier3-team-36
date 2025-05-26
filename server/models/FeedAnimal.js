import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const FeedAnimalSessionSchema = new Schema({
    userId:    { type: Types.ObjectId, ref: 'User', required: true },
    score:     { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const FeedAnimalSession = model(
    'FeedAnimalSession',
    FeedAnimalSessionSchema
);
