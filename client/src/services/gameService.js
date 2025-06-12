import axios from 'axios';


const backendUrl = process.env.NODE_ENV === 'production'
    ? 'https://v54-tier3-team-36.onrender.com'
    : 'http://localhost:5000';

const API_URL = `${backendUrl}/api`;

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        throw new Error('No authentication token found. Please log in.');
    }

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            console.error('Failed to parse error response:', e);
            errorMessage = `Error parsing response: ${errorMessage}`;
        }
        throw new Error(errorMessage);
    }
    return await response.json();
};


export const saveGameResult = async (gameData) => {
    try {
        const response = await fetch(`${API_URL}/games/save`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                ...gameData,
                gameType: gameData.gameType || 'Hungry Paws',
                savedAt: new Date().toISOString()
            })
        });

        return await handleResponse(response);

    } catch (error) {
        console.error('[Game Service] Error saving game result:', error);

        // Provide more specific error messages
        if (error.message.includes('token') || error.message.includes('authentication')) {
            throw new Error('Authentication failed. Please log in again.');
        }

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
