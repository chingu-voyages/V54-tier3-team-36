import axios from 'axios';

// Use the same backend URL as in your auth.jsx
const backendUrl = process.env.NODE_ENV === 'production' 
  ? 'https://v54-tier3-team-36.onrender.com' 
  : 'http://localhost:5000';

const API_URL = `${backendUrl}/api`;

export const saveGameResult = async (gameData) => {
  try {
    const response = await axios.post(`${API_URL}/games/feed-the-animal`, gameData);
    return response.data;
  } catch (error) {
    console.error('Error saving game result:', error);
    throw error;
  }
};

export const getGameHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/games/feed-the-animal/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game history:', error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/games/feed-the-animal/leaderboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};
