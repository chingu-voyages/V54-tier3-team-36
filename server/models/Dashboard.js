import mongoose from 'mongoose';
import GameStatSchema from './GameStat.js';

const { Schema, model } = mongoose;


const dashboardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // quiz: {
  //   type: {
  //     numOfTries: { type: Number, default: 0 },
  //     highestPoints: { type: Number, default: 0 }
  //   }
  // },
  games: {
    type: [GameStatSchema],
    default: () => []
  },

  badges: {
    type: [String],
    default: []
  }

})

const Dashboard = model('Dashboard', dashboardSchema);

export default Dashboard;