import mongoose from 'mongoose';

const feedTheAnimalSchema = new mongoose.Schema({
  userId: { 
    type: String,
    required: true,
    index: true
  },
  
  // Game data
  score: { 
    type: Number, 
    required: true 
  },
  livesLeft: { 
    type: Number, 
    required: true 
  },
  timePlayed: {  // in milliseconds
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

// Index for high scores
feedTheAnimalSchema.index({ score: -1 });

const FeedTheAnimal = mongoose.model('FeedTheAnimal', feedTheAnimalSchema);

export default FeedTheAnimal;