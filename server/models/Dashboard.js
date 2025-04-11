import mongoose from 'mongoose';


const dashboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    
  slidingPuzzle: {
    type: {
      numOfTries: { type: Number, default: 0 },
      highestPoints: { type: Number, default: 0 }
    }
  }, 

  guessSound: {
    type: {
      numOfTries: { type: Number, default: 0 },
      highestPoints: { type: Number, default: 0 }
    }
  }, 

  flashCard: {
    type: {
      numOfTries: { type: Number, default: 0 },
      highestPoints: { type: Number, default: 0 }
    }
  }, 

})

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

export default Dashboard;