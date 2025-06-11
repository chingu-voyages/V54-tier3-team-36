import React, { useState, useEffect } from "react";
import GameStatsModal from "./GameStatsModal";

const Profile = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Replace with actual API call to fetch user data
  useEffect(() => {
    // Simulating API call
    const fetchUserData = async () => {
      try {
        // This will be replaced with actual API call
        // const response = await fetch('/api/user/profile');
        // const data = await response.json();
        
        // Placeholder data structure matching expected backend response
        const mockUserData = {
          username: "User Name",
          email: "example.com",
          avatar: null, // Will be replaced with actual avatar URL
          gameStats: {
            "Animal Puzzle": {
              stats: [
                { label: "Total tries", value: "—" },
                { label: "Lowest moves", value: "—" },
                { label: "Highest moves", value: "—" },
              ],
              achievements: [],
              avatars: [],
            },
            "Guess the Animal Sound": {
              stats: [
                { label: "Wins", value: "—" },
                { label: "Tokens", value: "—" },
                { label: "Trophy", value: "—" },
              ],
              achievements: [],
              avatars: [],
            },
            "Animal Memory Game": {
              stats: [
                { label: "Tries", value: "—" },
                { label: "Completed", value: "—" },
                { label: "Perfect runs", value: "—" },
              ],
              achievements: [],
              avatars: [],
            },
            "Animal Quiz": {
              stats: [
                { label: "Correct answers", value: "—" },
                { label: "Completed", value: "—" },
              ],
              achievements: [],
              avatars: [],
            },
            "Hungry Paws": {
              stats: [
                { label: "Total tries", value: "—" },
                { label: "Best Score", value: "—" }
              ],
              achievements: [],
              avatars: [],
            },
          },
          unlockedAvatars: [],
          achievements: [],
        };

        setUserData(mockUserData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl p-6 md:p-10 my-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl p-6 md:p-10 my-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Failed to load profile data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl p-6 md:p-10 my-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-full border-2 border-green-300 flex items-center justify-center text-lg font-semibold text-gray-400">
          {userData.avatar ? (
            <img src={userData.avatar} alt="User avatar" className="w-full h-full rounded-full" />
          ) : (
            "Avatar"
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">{userData.username}</h2>
          <p className="text-gray-500 text-sm">{userData.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(userData.gameStats).map(([game, stats]) => (
          <div
            key={game}
            onClick={() => handleGameClick(game)}
            className="bg-green-100 shadow-md rounded-xl p-6 cursor-pointer hover:bg-green-200 transition-colors h-[180px]"
          >
            <h3 className="font-bold text-lg text-gray-800 mb-2">{game}</h3>
            <div className="space-y-1 text-gray-700">
              {stats.stats.slice(0, 3).map((stat, index) => (
                <div key={index} className="flex justify-between">
                  <span>{stat.label}:</span>
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-bold text-lg text-gray-800 mb-1">Unlocked Avatars</h4>
        {userData.unlockedAvatars.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {userData.unlockedAvatars.map((avatar, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                {avatar.icon}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No avatars unlocked.</p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-bold text-lg text-gray-800 mb-1">Achievements</h4>
        {userData.achievements.length > 0 ? (
          <div className="space-y-2">
            {userData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium text-gray-800">{achievement.title}</p>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No achievements yet.</p>
        )}
      </div>

      {selectedGame && (
        <GameStatsModal
          game={selectedGame}
          stats={userData.gameStats[selectedGame].stats}
          achievements={userData.gameStats[selectedGame].achievements}
          avatars={userData.gameStats[selectedGame].avatars}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Profile;
