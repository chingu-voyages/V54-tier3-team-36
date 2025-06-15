import React, { useState, useEffect } from "react";
import GameStatsModal from "./GameStatsModal";
import avatar1 from "../assets/profile/avatar1.png";
import avatar2 from "../assets/profile/avatar2.png";
import avatar3 from "../assets/profile/avatar3.png";
import avatar4 from "../assets/profile/avatar4.png";
import avatar5 from "../assets/profile/avatar5.png";
import avatar6 from "../assets/profile/avatar6.png";
import avatar7 from "../assets/profile/avatar7.png";
import avatar8 from "../assets/profile/avatar8.png";
import avatar9 from "../assets/profile/avatar9.png";

const avatarList = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9];

const Profile = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

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
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-lg font-semibold text-gray-400 cursor-pointer p-1 bg-white" onClick={() => setShowAvatarModal(true)}>
          <img src={selectedAvatar} alt="User avatar" className="w-24 h-24 rounded-full object-cover block aspect-square" />
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

      {/* Avatar Selection Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full">
            <h3 className="text-lg font-bold mb-4 text-center">Choose your avatar</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {avatarList.map((avatar, idx) => (
                <button
                  key={idx}
                  className={`rounded-full border-4 ${selectedAvatar === avatar ? 'border-green-500' : 'border-transparent'} focus:outline-none bg-white flex items-center justify-center p-1 aspect-square w-24 h-24`}
                  onClick={() => { setSelectedAvatar(avatar); setShowAvatarModal(false); }}
                  style={{ aspectRatio: '1/1' }}
                >
                  <img src={avatar} alt={`Avatar ${idx + 1}`} className="w-20 h-20 rounded-full object-cover block aspect-square" style={{ aspectRatio: '1/1' }} />
                </button>
              ))}
            </div>
            <button className="w-full py-2 bg-gray-200 rounded-lg font-semibold" onClick={() => setShowAvatarModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
