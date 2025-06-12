import mongoose from 'mongoose';

const feedTheAnimalSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true,
    index: true
  },

  playerName: {
    type: String,
    required: false
  },


  gameType: {
    type: String,
    default: 'feed-animal',
    required: false
  },
  

  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  

  score: { 
    type: Number, 
    required: true 
  },
  livesLeft: { 
    type: Number, 
    required: true 
  },
  timePlayed: {
    type: Number, 
    required: true 
  },
  correctFeeds: { 
    type: Number, 
    default: 0 
  },
  incorrectFeeds: { 
    type: Number, 
    default: 0 
  },
  gameOverReason: { 
    type: String,
    enum: ['no_lives', 'time_up'], 
    required: true 
  }
}, { 
  timestamps: true 
});


feedTheAnimalSchema.index({ score: -1 });

const FeedTheAnimal = mongoose.model('FeedTheAnimal', feedTheAnimalSchema);

export default FeedTheAnimal;