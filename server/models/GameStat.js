import mongoose from 'mongoose';

const { Schema } = mongoose;


// Sub-schema for each game play session
const GamePlaySchema = new Schema({
  score: { type: Number, required: true },
  playedAt: { type: Date, default: Date.now }
}, { _id: false }); // optional to suppress _id for each play if not needed

const GameStatSchema = new Schema({
  gameName: {
    type: String,
    required: true
  },
  numOfWins: {
    type: Number,
    default: 0
  },
  highestScore: {
    type: Number,
    default: 0
  },
  // number of tries could be calculate through history
  history: [GamePlaySchema]
  
})

export default GameStatSchema;